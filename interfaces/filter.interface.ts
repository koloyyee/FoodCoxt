export interface GlobalFilterInterface {
    value: string | number
    onChange: (value: React.SetStateAction<string | number>) => void
}
