# Gyan Institute Website

Premium React + Vite institute website using a Navy / White / Gold visual system and Montserrat.

## Public pages
- Home
- About Us
- Courses
- Facilities
- Testimonials
- Gallery
- Blog
- Blog Details
- Contact Us

## Admin pages
- `/admin/login`
- `/admin/overview`
- `/admin/courses`
- `/admin/contact-info`
- `/admin/inquiries`
- `/admin/blog`
- `/admin/home-hero`
- `/admin/about`

## Run
```bash
npm install
npm run dev
```

The admin login is a front-end demo UI. Connect it to your real authentication API before production.

All new public/admin page content is kept inside its respective page file. There is no dependency on `siteData.js` for the new content.
