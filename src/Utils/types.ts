import slugify from 'slugify'

export type Post = {
  title: string 
  image: string
  date: Date | string
  text: string
  slug: string
  isFeatured: boolean
}
