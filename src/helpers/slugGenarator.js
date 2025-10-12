function generateSlug(productTitle) {
  // 1️⃣ Basic slug বানানো
  let slug = productTitle
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // special char বাদ
    .replace(/\s+/g, '-')     // space → dash
    .replace(/--+/g, '-');    // multiple dash clean
  
  // 2️⃣ Random unique part যোগ করা (5-character hex code)
  const randomCode = Math.random().toString(16).substring(2, 7);
  
  // 3️⃣ slug + random part
  return `${slug}-${randomCode}`;
}


module.exports = generateSlug