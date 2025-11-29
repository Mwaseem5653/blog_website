import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { searchPostsQuery } from '@/sanity/lib/query';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get('q');

  if (!searchTerm) {
    return NextResponse.json({ message: 'Search term is required' }, { status: 400 });
  }

  try {
    const posts = await client.fetch(searchPostsQuery, { searchTerm });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching search results:', error);
    return NextResponse.json({ message: 'Error fetching search results' }, { status: 500 });
  }
}
