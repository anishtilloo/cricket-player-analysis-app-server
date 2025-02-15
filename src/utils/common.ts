export function convertBigIntToString<T extends { id: bigint }>(data: T): Omit<T, "id"> & { id: string } {
    return {
        ...data,
        id: data.id.toString(),    
    }
}

