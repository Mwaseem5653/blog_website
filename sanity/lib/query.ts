export const allPostsQuery = `*[_type=="post"]{
  title,
  slug,
  "mainImage": contentBlocks[0].image,
  "firstContentBlock": contentBlocks[0].content[0..1],
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
  "mainImage": contentBlocks[0].image,
  "firstContentBlock": contentBlocks[0].content[0..1],
  publishedAt,
  "author": author{name},
  category
}`;

export const postBySlugQuery = `*[_type=="post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  contentBlocks[]{
    image{asset->{url}, alt},
    content[]{..., "asset": asset->}
  },
  category->{title, "slug": slug.current},
  "author": author{name},
  publishedAt,
  "seo": {
    "metaTitle": seo.metaTitle,
    "metaDescription": seo.metaDescription
  }
}`;
