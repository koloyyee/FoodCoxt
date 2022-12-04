export interface IGlobalFilter{
    value: string | number
    onChange: (value: React.SetStateAction<string | number>) => void
}
