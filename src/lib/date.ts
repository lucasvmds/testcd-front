export class DateUtil extends Date
{
    constructor(dateString?: string)
    {
        dateString ? super(dateString) : super();
    }

    public static make(dateString: string = ''): DateUtil
    {
        return new this(dateString);
    }

    private fillZero(number: number): string
    {
        return number > 9 ? number.toString() : '0' + number.toString();
    }

    public format(format: string, utc: boolean = false): string
    {
        if (!format) return this.toString();

        return format
                    .replace(/Y/g, this.fillZero(utc ? this.getUTCFullYear() : this.getFullYear()))
                    .replace(/m/g, this.fillZero((utc ? this.getUTCMonth() : this.getMonth()) + 1))
                    .replace(/d/g, this.fillZero(utc ? this.getUTCDate() : this.getDate()))
                    .replace(/H/g, this.fillZero(utc ? this.getUTCHours() : this.getHours()))
                    .replace(/i/g, this.fillZero(utc ? this.getUTCMinutes() : this.getMinutes()))
                    .replace(/s/g, this.fillZero(utc ? this.getUTCSeconds() : this.getSeconds()));
    }

    public static iso(date: string): string
    {
        return (new this(date)).toISOString();
    }

    public getTimezone(): string
    {
        return DateUtil.getTimezone();
    }

    public static getTimezone(): string
    {
        let tzHours = (new DateUtil).getTimezoneOffset() / 60;
        let timezone = '';
        if (tzHours >= 0) {
            if (tzHours < 10) {
                timezone = `-0${tzHours}:00`;
            } else {
                timezone = `-${tzHours}:00`;
            }
        } else {
            if (tzHours > -10) {
                timezone = `+0${tzHours * -1}:00`;
            } else {
                timezone = `+${tzHours * -1}:00`;
            }
        }
        return timezone;
    }
}