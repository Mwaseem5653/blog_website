export const allPostsQuery = `*[_type=="post"]{
  title,
  slug,
  mainImage{asset->{url}},
  category
}`;

export const allCategoriesQuery = `*[_type=="category"]{
  "slug": slug.current
}`;

export const postsByCategoryQuery = `*[_type == "post" && category == $slug]{
  title,
  slug,
  mainImage{asset->{url}},
  category
}`;

export const postBySlugQuery = `*[_type=="post" && slug.current == $slug][0]{
  title,
  slug,
  mainImage{asset->{url}},
  content,
  category,
  author,
  publishedAt
}`;
