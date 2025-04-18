export type categoryType = {
  id: number
  name: string
}

export type categoryName = {
  name: string
}

export type categoriesType = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export type categoriesResponse = {
  category: categoriesType[]
}
