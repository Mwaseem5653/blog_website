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
          { title: "Health & Fitness", value: "health-fitness" },
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

    // ⭐ Content Area 1 (Required as original)
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),

    // ⭐ Additional Image + Content Areas (Optional)
    defineField({
      name: "extraImage1",
      title: "Extra Image 1",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "extraContent1",
      title: "Extra Content 1",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "extraImage2",
      title: "Extra Image 2",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "extraContent2",
      title: "Extra Content 2",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "extraImage3",
      title: "Extra Image 3",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "extraContent3",
      title: "Extra Content 3",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),

    // ⭐ SEO Fields
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
