export const allPostsQuery = `*[_type=="post"]{
  title,
  slug,
  _updatedAt,
  mainImage{asset->{url}},
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
  "slug": slug.current,
  mainImage{asset->{url}},
  excerpt,
  publishedAt,
  "author": author{name},
  category
}`;

export const postBySlugQuery = `*[_type=="post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  mainImage{asset->{url}, alt},
  "content": content[]{..., "asset": asset->},
  category->{title, "slug": slug.current},
  "author": author{name},
  publishedAt,
  "seo": {
    "metaTitle": seo.metaTitle,
    "metaDescription": seo.metaDescription
  }
}`;
