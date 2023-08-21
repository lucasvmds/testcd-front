<script lang="ts">
    import type { PaginatedResponse } from "./index";
    import { goto } from "$app/navigation";
    import { afterUpdate } from "svelte";
    import previousIcon from "./icons/previous.svg?raw";
    import nextIcon from "./icons/next.svg?raw";
    import firstIcon from "./icons/first.svg?raw";
    import lastIcon from "./icons/last.svg?raw";
    import { Select } from "$lib/form";
    import "./style.less";
    export let meta: PaginatedResponse['meta'];
    export let links: PaginatedResponse['links'];

    let initialItemsPerPage: number = 20;
    let currentPage = meta.current_page;
    let perPage = meta.per_page;
    
    function changePage(): void
    {
        const query = Object.fromEntries<string>(
            new URLSearchParams(location.search)
        );
        delete query.page;
        delete query.items;
        currentPage > 1 ? query.page = currentPage.toString() : null;
        perPage > initialItemsPerPage ? query.items = perPage.toString() : null;
        const url = new URL(window.location.origin + window.location.pathname);
        for (const key in query) {
            url.searchParams.set(key, query[key]);
        }
        goto(url);
    }

    function validatePageNumber(): void
    {
        if (meta.current_page > meta.last_page) {
            currentPage = 1;
            changePage();
        }
    }
    afterUpdate(validatePageNumber);

    function previous(): void
    {
        currentPage--;
        changePage();
    }

    function next(): void
    {
        currentPage++;
        changePage();
    }

    function first(): void
    {
        currentPage = 1;
        changePage();
    }

    function last(): void
    {
        currentPage = meta.last_page;
        changePage();
    }
</script>

<form on:submit|preventDefault title="paginação dos registros" class="pagination-component">
    <span>
        Exibindo dos itens {meta.from} - {meta.to} de um total de {meta.total} registros
    </span>
    <br>
    <Select label="Itens por página" bind:value={perPage} error="" on:change={changePage}>
        <option value={20}>20</option>
        <option value={40}>40</option>
        <option value={60}>60</option>
        <option value={80}>80</option>
        <option value={100}>100</option>
    </Select>
    <button type="button" on:click={first} disabled={meta.current_page === 1} title="primeira página">
        {@html firstIcon}    
    </button>
    <button type="button" on:click={previous} disabled={!links.prev} title="página anterior">
        {@html previousIcon}
    </button>
    <button type="button" on:click={next} disabled={!links.next} title="próxima página">
        {@html nextIcon}
    </button>
    <button type="button" on:click={last} disabled={meta.current_page === meta.last_page} title="última página">
        {@html lastIcon}
    </button>
</form>