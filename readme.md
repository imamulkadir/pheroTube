# pheroTube

pheroTube is a dynamic video browsing application that fetches and displays videos from the [Programming Hero API](https://openapi.programming-hero.com/). It offers features like category-based filtering, search functionality, and sorting by view count.

## Features

- **Category Filtering**: Browse videos by categories such as Technology, Science, and more.
- **Search Functionality**: Quickly find videos by title.
- **Sorting**: Toggle between ascending and descending order based on view count.
- **Responsive Design**: Optimized for both desktop and mobile views.

## Technologies Used

- **HTML**: Structure and layout of the application.
- **CSS**: Styling using Tailwind CSS for utility-first design.
- **JavaScript**: Fetching data from the API, handling user interactions, and dynamic content rendering.

## File Structure

```project_structure
pheroTube/
├── assets/
│ └── Logo.png
├── index.html
├── style.css
├── script/
│ └── video.js
└── tailwind.config.js
```

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/imamulkadir/pheroTube.git
   cd pheroTube
   ```

2. **Include DaisyUI and Tailwind CSS**:

```bash
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css"/>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

_Open `index.html` in your browser to view the application._

**Usage**

- Browse Categories: Click on any category button to view videos related to that category.
- Search Videos: Use the search bar to find videos by title.
- Sort Videos: Click the "SORT" button to toggle between ascending and descending order based on view count.

**License**
This project is open-source and available under the [MIT License](https://opensource.org/license/cddl-1-1).

**Acknowledgements**
<ins>Programming Hero API<ins>

- [GET: Categories](https://openapi.programming-hero.com/api/phero-tube/categories)
- [GET: Videos](https://openapi.programming-hero.com/api/phero-tube/videos)
- GET: Video based on Catagory [ params ]
  - [Endpoint](https://openapi.programming-hero.com/api/phero-tube/category/categoryId)
  - [Example](https://openapi.programming-hero.com/api/phero-tube/category/1001)
- GET: Video based on Title [ Query ]
  - [Endpoint](https://openapi.programming-hero.com/api/phero-tube/videos?title=videoTitle)
  - [Example](https://openapi.programming-hero.com/api/phero-tube/videos?title=shape)
- GET: Video Details by video_id [ Query ]
  - [Endpoint](https://openapi.programming-hero.com/api/phero-tube/video/video_id)
  - [Example](https://openapi.programming-hero.com/api/phero-tube/video/aaac)

For any issues or contributions, please refer to the [GitHub repository](https://github.com/imamulkadir/pheroTube).
