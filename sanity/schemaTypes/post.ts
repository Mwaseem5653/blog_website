import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Post Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Short Summary",
      type: "text",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Skin Care", value: "skin-care" },
          { title: "Hair Care", value: "hair-care" },
          { title: "Acne", value: "acne" },
          { title: "Whitening", value: "whitening" },
          { title: "Bridal", value: "bridal" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for SEO",
        },
      ],
    }),

    defineField({
      name: "author",
      title: "Author Info",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Author Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),

    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),

    // ✅ SEO Fields
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "SEO title (appears in search results)",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          description: "SEO description (appears in search results)",
        },
        {
          name: "keywords",
          title: "Keywords (optional)",
          type: "array",
          of: [{ type: "string" }],
          description: "Target keywords for the blog post",
        },
      ],
    }),
  ],
});
