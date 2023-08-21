export { default as RecordsTable } from "./Table.svelte";
import EditAction from "./EditAction.svelte";
import DeleteAction from "./DeleteAction.svelte";
import ShowAction from "./ShowAction.svelte";

export const actions = {
    edit: EditAction,
    delete: DeleteAction,
    show: ShowAction,
}