export const allPostsQuery = `*[_type=="post"]{
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  _updatedAt,
  category,
  "author": author{name}
}`;

export const allCategoriesQuery = `*[_type=="category"]{
  title,
  "slug": slug.current,
  "lastmod": *[_type=="post" && references(^._id)] | order(_updatedAt desc)[0]._updatedAt
}`;

export const postsByCategoryQuery = `*[_type == "post" && category == $slug]{
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  _updatedAt,
  "author": author{name},
  category
}`;

export const postBySlugQuery = `*[_type=="post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  mainImage{
    ...,
    asset->{
      ...,
      "metadata": metadata
    }
  },
  content[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        ...,
        "metadata": metadata
      }
    }
  },
  extraImage1,
  extraContent1,
  extraImage2,
  extraContent2,
  extraImage3,
  extraContent3,
  category,
  "author": author{name},
  publishedAt,
  _updatedAt,
  "seo": {
    "metaTitle": seo.metaTitle,
    "metaDescription": seo.metaDescription,
    "keywords": seo.keywords
  }
}`;

export const searchPostsQuery = `*[_type == "post" && (title match $searchTerm + "*" || excerpt match $searchTerm + "*")]{
  title,
  "slug": slug.current,
  mainImage,
  excerpt,
  publishedAt,
  category,
  "author": author{name}
}[0...100]`; // Limit to 100 results for search page




