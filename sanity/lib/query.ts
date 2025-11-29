export const allPostsQuery = `*[_type=="post"]{
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  category,
  "author": author{name}
}`;

export const allCategoriesQuery = `*[_type=="category"]{
  title,
  "slug": slug.current,
  "lastmod": *[_type == "post" && references(^._id)][0]._updatedAt
}`;

export const postsByCategoryQuery = `*[_type == "post" && category == $slug]{
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  "author": author{name},
  category
}`;

export const postBySlugQuery = `*[_type=="post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  mainImage,
  content,
  extraImage1,
  extraContent1,
  extraImage2,
  extraContent2,
  extraImage3,
  extraContent3,
  category,
  "author": author{name},
  publishedAt,
  "seo": {
    "metaTitle": seo.metaTitle,
    "metaDescription": seo.metaDescription,
    "keywords": seo.keywords
  }
}`;
