# Plug & Play - Portfolio setup Guide

This portfolio was built to be **fully reusable**, meaning you can clone it, replace the content in the config file, customize if you want, and publish it as **your own portfolio** — no credit required (but much appreciated, cmon throw some shime my way 😊).

You can follow the steps below to personalize and set it up.
---
## Clone the project
```bash
# Clone the repo
git clone https://github.com/Joxeph21/joedecodes.git

# Rename the repo (Optional but recommended)
mv joedecodes NEW_NAME

# Enter repo
cd NAME
```
## Dependency Installation

This project uses pnpm as its package installer.  
If you don’t have pnpm installed yet, please head over to [pnpm’s official website](https://pnpm.io/) and install it.
If you have it installed, proceed with:

```bash
pnpm i # or pnpm install

# Run locally
pnpm dev
```  
The project should now run live on port 4321 (if available). You can go ahead and preview it by going to the URL.

## Personalization

To make updating easier, I created a config.ts file to help update values without going through a lot of unnecessary stress.
```arduino
src/utils/config.ts
```
### Updating Assets (**Important**)

To ensure everything works correctly, follow the asset update rules below:

| Asset Type | Location | Naming Requirement | Notes |
|------------|----------|--------------------|--------|
| **Main profile image** | `public/` | `user.jpg` | Must replace the existing file (JPG only). This image is used for SEO & metadata previews. |
| **Project screenshots** | `public/projects/` | `projectX.Y` (e.g. `project1.1.png`) | Image count & naming must match exactly as used in `config.ts`. (Image/*). |
| **Favicon files** | `public/` | Provided by favicon generator | Create using [favicon.io](https://favicon.io/) then paste **all** exported files into `public/`. |
| **Resume / CV** | `public/` | `cv.pdf` | Must be PDF and named exactly `cv.pdf`. Format can be customized inside `About.tsx`. |
| **robots.txt** | `public/robots.txt` | Must contain correct hosted URL | Update the sitemap/host link after deploying (e.g. Vercel). |

---
### Updating Details

For the basic information, you'll need to update the user object

```typescript
export const USER = {
  TITLE: "" /*Leave Blank if your website title is the same as your name*/,
  NAME: "<YOUR-NAME>",
  TAGLINE: "Tagline" /*Tagline in the About Section (optional, remove if not interested)*/,
  ROLE: "Creative Frontend Developer" /*Replace with Role if different*/,
  DESCRIPTION: `<DESCRIPTION>`,
  SITE_URL: "<!IMPORTANT, (After hosting your portfolio, make sure to update this as well, it's for meta Tags)>",
  KEYWORDS: [<Keywords (optional)>] /*Array of strings, They are for meta tag keywords, for browsers that still use them*/,
  SOCIALS: {
    GITHUB: "<GITHUB PROFILE LINK>",
    CALENDLY: "<CALENDLY DISCUSSION LINK>",
    LINKEDIN: "<LINKEDIN PROFILE LINK>",
    UPWORK: "<UPWORK PROFILE LINK>",
    MAIL: "<EMAIL>" /* Must be in the format name@mail.com*/,
    WHATSAPP: "<WHATSAPP LINK> " /* OR EDIT PHONE AND USE LINK -> https://wa.me/NUMBER */,
  }
};
```

For the floating tags in the Hero section / Component, you'll need to update the **TAGS** Array.

```typescript 
const Tags: {label: string, info: string}[] = []

```
For the counting Stats and Tech stacks, update the stats [] and the techStacks [].
- **Note** The stack_Tags [] is for the full representation of all tech stacks and is grouped.
- **Icons** All Icons were gotten from @Iconify/React, their name copied and placed in the icon-export.ts file, for easier access
```typescript

const Stats: {label: string, value: number, unit: string}[] = []
const techStacks: {label: string, icon: string}[] = []
const Stack_Tags: {title: items: {label: string, icon: string}[]}[] = []

```
```typescript
/* src/utils/icon-export.ts */
export enum ICON = {
KEY= "Iconify icon name"
}

```
---
For the services you're offering, make sure to update the services array. The Short is for a short description,  while Rich is for the longer description, displayed in the pop-up when you click learn more

```typescript 
const services {title: string, icon: string, short: string, rich: string}[] = []
```
---
For the Projects, update the Projects array. By default, the Projects Array is sliced, and the first is displayed in the project section. If you want to edit that, head to the Projects.tsx file and edit

```ts
/*Why I did this was to make the project.tsx reusable when displaying more projects, like in the projects page,

Change the limit in the index.astro file, if you want to display more than 3
*/

 const featured = Boolean(limit) ? PROJECTS.slice(0, limit) : PROJECTS;

```
---
### Updating Testimonials Section (Optional)
This might get tricky, but hold on still as I break everything down gracefully
- Testimonials were uploaded on a Supabase database. If you'd like to do the same, follow the steps below
---

#### Create a Supabase Project
- Do that by heading over to [Supabase](https://supabase.com), and create a new project.
- After creating, Head over to the SQL editor located in the sidebar
- Paste the SQL snippet below to help initialize a table
  
```sql
-- Create the reviews table with predefined values
CREATE TABLE IF NOT EXISTS public.reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    avatar TEXT DEFAULT '',      -- Make sure to change this to a default image url from your storage bucket
    socials JSONB DEFAULT '{}'::jsonb,
    role TEXT DEFAULT '',
    email TEXT DEFAULT ''
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into reviews
CREATE POLICY "Allow public insert on reviews"
ON public.reviews
FOR INSERT
TO public
WITH CHECK ( true );

-- Allow anyone to select reviews
CREATE POLICY "Allow public select on reviews"
ON public.reviews
FOR SELECT
TO public
USING ( true );

```
---
If you did that correctly, you should have a supabase table called reviews, you can head over to the supabase API Docs to view endpoints

#### Create supabase storage Bucket 
- To store user uploaded images, create a storage bucket called avatars, make sure to make it public
- Upload a default image in it (For users that don't upload images), Get the url and make sure to update the default value of avatars in your reviews table

#### Inserting into Supabase Reviews Table
- View the [Supabase Docs](), to learn how to connect supabase
- When submitting the form call the snippet below

```ts
type SOCIALS = {
  name: "linkedin" | "instagram" | "x";
  url: string;
};

async function submitReview(values: {
  avatar?: File;
  role: string;
  content: string;
  socials: SOCIALS[];
  name: string;
}) {
  try {
    // Store Image name
    let uploadedFileName: string | undefined;

    // Declare a base payload
    const reviewData: {
      role: string;
      content: string;
      socials: SOCIALS[];
      name: string;
      avatar?: string;
    } = {
      role: values.role,
      content: values.content,
      socials: values.socials,
      name: values.name,
    };

    // Upload image if there is an avatar
    if (values.avatar instanceof File) {
      const fileExt = values.avatar.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      uploadedFileName = fileName;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, values.avatar);

      if (uploadError) throw uploadError;

      const { data: url } = supabase.storage
        .from("avatars")
        .getPublicUrl(uploadData.path);

      if (url) {
        reviewData.avatar = url.publicUrl;
      }
    }

    // Insert review into Supabase
    const { data, error } = await supabase
      .from("reviews")
      .insert([reviewData])
      .select();

    if (error) throw error;
    if (data) {
     //Toast a success Message and reset Form
    }

    return data;
  } catch (err) {
    // Toast a message for failed instance
//Delete Uploaded avatar
 if (imgName) {
      deleteAvatar(imgName);
    }
    throw err;
  }
}

```

```typescript
// Delete Uploaded Image
async function deleteAvatar(filePath) {
  const { data, error } = await supabase.storage
    .from("avatars")
    .remove([filePath]);

  if (error) {
throw error
return;
  } 
}
```
---
#### Fetching Reviews

- The logic for fetching reviews was updated in the src/components/Testimonials.astro
- Just Make sure to save your env in this Format

  ```env
  PUBLIC_SUPABASE_KEY= "Supabase Anon Key"
  ```
---
### You’re All Set! 🎉

Congratulations! 🎉 Your portfolio is now ready to go. By following this guide, you should have a fully functional, personalized portfolio that’s plug-and-play. If you ran into any issue whatsoever, feel free to contact me. Repo is also open for contributions, 
