// Funcionalidade para omitir um valor das minhas props
export type Replace<T, R> = Omit<T, keyof R> & R; 