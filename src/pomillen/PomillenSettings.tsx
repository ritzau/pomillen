export default class PomillenSettings {

    constructor(
        readonly lastConfirmedEula: number = 0,
    ) { }

    public static CreateFromProps(props: any) {
        return new PomillenSettings(
            props.lastConfirmedEula,
        )
    }

    public static CreateFrom(settings: PomillenSettings, props: any) {
        return new PomillenSettings(
            props.lastConfirmedEula ?? settings.lastConfirmedEula,
        )
    }
}
