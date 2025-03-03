const buttons = document.querySelectorAll('#projects-tag-bar > button');

function updateTags() {
    buttons.forEach(button => {
        if (button.classList.contains('selected')) {
            const bgColor = button.dataset.color;
            button.style.backgroundColor = bgColor;
            button.style.outline = `2px solid ${bgColor}`;
        }
        else {
            button.removeAttribute('style');
        }
    });
}

updateTags();

buttons.forEach(button => {
    button.addEventListener('click', function() {
        document.querySelector('#projects-tag-bar > button.selected').classList.remove('selected');
        this.classList.add('selected');
        updateTags();

        if(this.dataset.english === 'All') {
            drawProjectsList(projects);
            return;
        }

        const filteredProjectArray = projects.filter(projectObject => projectObject.tags.includes(this.textContent));
        drawProjectsList(filteredProjectArray);
    });
});


// === PROJECTS ===

const projects = [
    {
        title: 'TaskStream',
        tags: ['Web', 'React'],
        img: 'task-stream.png',
        github: '',
        youtube: '',
        web: 'https://task-stream.site',
        promoted: true
    },
    {
        title: 'Spark.js - a 2D Particle FX Library',
        tags: ['Web', 'TypeScript'],
        img: 'ts-particle-system.png',
        github: 'https://github.com/Wojtek-987/spark.js',
        youtube: '',
        web: 'https://editor.p5js.org/Wojtek987/sketches/UqBWRs7yg',
        promoted: true
    },
    {
        title: 'TINY - C++ JIT interpreter for custom programming language',
        tags: ['C++'],
        img: 'tiny-interpreter.png',
        github: 'https://github.com/Wojtek-987/TINY',
        youtube: 'https://www.youtube.com/@wojtek987',
        web: '',
        promoted: true
    },
    {
        title: 'Sudoku Board Generator',
        tags: ['Java'],
        img: 'java-sudoku.png',
        github: 'https://github.com/Wojtek-987/Sudoku',
        youtube: '',
        web: '',
        promoted: false
    },
    {
        title: 'Minesweeper Desktop App',
        tags: ['Python'],
        img: 'minesweeper.png',
        github: 'https://github.com/Wojtek-987/minesweeper',
        youtube: '',
        web: '',
        promoted: false
    },
    {
        title: 'Editing Showcase Video for Steve Parker Audiobooks',
        tags: ['Audio'],
        img: 'spa.jpg',
        github: '',
        youtube: 'https://www.youtube.com/watch?v=EZP3RqhiaT0',
        web: '',
        promoted: false
    },
    {
        title: 'Pong',
        tags: ['Web', 'P5.js'],
        img: 'p5-pong.png',
        github: '',
        youtube: '',
        web: 'https://editor.p5js.org/Wojtek987/sketches/iSPxXIfW3',
        promoted: false
    },
];

const tileContainer = document.querySelector('#project-tile-container');

function drawProjectsList(projectsList) {

    const tileArray = [];

    projectsList.forEach(project => {
        // create tile div
        const tile = document.createElement('div');
        const classArray = ['tile', 'grain'];
        if(project.promoted === true) classArray.push('promoted');

        tile.classList.add(...classArray);

        // create h3 title
        const h3 = document.createElement('h3');
        h3.textContent = project.title;
        tile.appendChild(h3);

        // create tag container
        const tagContainer = document.createElement('div');
        tagContainer.classList.add('tags');
        tile.appendChild(tagContainer);

        // create tags
        project.tags.forEach(currentTag => {
            const tag = document.createElement('span');
            tag.style.backgroundColor = Array.from(buttons).find(button => button.textContent === currentTag).dataset.color;
            tag.textContent = currentTag;
            tagContainer.appendChild(tag);
        });

        // create image
        const img = document.createElement('img');
        img.src = "assets/IMG/PROJECT_THUMBNAILS/" + project.img;
        img.setAttribute('draggable', 'false');
        img.setAttribute('loading', 'lazy');
        tile.appendChild(img);

        // create action bar
        const actionBar = document.createElement('div');
        actionBar.classList.add('action-bar');
        tile.appendChild(actionBar);

        // create github link
        if (project.github !== null && project.github.length > 0) {
            const github = document.createElement('a');
            github.href = project.github;
            github.target = '_blank';

            github.innerHTML = "<svg width=\"98\" height=\"96\" viewBox=\"0 0 98 96\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z\"/></svg>"

            actionBar.appendChild(github);
        }

        // create youtube link
        if (project.youtube !== null && project.youtube.length > 0) {
            const youtube = document.createElement('a');
            youtube.href = project.youtube;
            youtube.target = '_blank';

            youtube.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" width=\"256\" height=\"256\" viewBox=\"0 0 256 256\" xml:space=\"preserve\">\n" +
                "  <g style=\"stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;\" transform=\"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)\" >\n" +
                "\t<path d=\"M 88.119 23.338 c -1.035 -3.872 -4.085 -6.922 -7.957 -7.957 C 73.144 13.5 45 13.5 45 13.5 s -28.144 0 -35.162 1.881 c -3.872 1.035 -6.922 4.085 -7.957 7.957 C 0 30.356 0 45 0 45 s 0 14.644 1.881 21.662 c 1.035 3.872 4.085 6.922 7.957 7.957 C 16.856 76.5 45 76.5 45 76.5 s 28.144 0 35.162 -1.881 c 3.872 -1.035 6.922 -4.085 7.957 -7.957 C 90 59.644 90 45 90 45 S 90 30.356 88.119 23.338 z M 36 58.5 v -27 L 59.382 45 L 36 58.5 z\" style=\"stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;\" transform=\" matrix(1 0 0 1 0 0) \" stroke-linecap=\"round\" />\n" +
                "  </g>\n" +
                "</svg>";

            actionBar.appendChild(youtube);
        }

        // create web link
        if (project.web !== null && project.web.length > 0) {
            const web = document.createElement('a');
            web.href = project.web;
            web.target = '_blank';

            web.innerHTML = "<svg class=\"svg-icon\" style=\"vertical-align: middle;fill: currentColor;overflow: hidden;\" viewBox=\"86 86 852 852\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M698.026667 597.333333C701.44 569.173333 704 541.013333 704 512 704 482.986667 701.44 454.826667 698.026667 426.666667L842.24 426.666667C849.066667 453.973333 853.333333 482.56 853.333333 512 853.333333 541.44 849.066667 570.026667 842.24 597.333333M622.506667 834.56C648.106667 787.2 667.733333 736 681.386667 682.666667L807.253333 682.666667C766.293333 753.066667 701.013333 807.68 622.506667 834.56M611.84 597.333333 412.16 597.333333C407.893333 569.173333 405.333333 541.013333 405.333333 512 405.333333 482.986667 407.893333 454.4 412.16 426.666667L611.84 426.666667C615.68 454.4 618.666667 482.986667 618.666667 512 618.666667 541.013333 615.68 569.173333 611.84 597.333333M512 851.626667C476.586667 800.426667 448 743.68 430.506667 682.666667L593.493333 682.666667C576 743.68 547.413333 800.426667 512 851.626667M341.333333 341.333333 216.746667 341.333333C257.28 270.506667 322.986667 215.893333 401.066667 189.44 375.466667 236.8 356.266667 288 341.333333 341.333333M216.746667 682.666667 341.333333 682.666667C356.266667 736 375.466667 787.2 401.066667 834.56 322.986667 807.68 257.28 753.066667 216.746667 682.666667M181.76 597.333333C174.933333 570.026667 170.666667 541.44 170.666667 512 170.666667 482.56 174.933333 453.973333 181.76 426.666667L325.973333 426.666667C322.56 454.826667 320 482.986667 320 512 320 541.013333 322.56 569.173333 325.973333 597.333333M512 171.946667C547.413333 223.146667 576 280.32 593.493333 341.333333L430.506667 341.333333C448 280.32 476.586667 223.146667 512 171.946667M807.253333 341.333333 681.386667 341.333333C667.733333 288 648.106667 236.8 622.506667 189.44 701.013333 216.32 766.293333 270.506667 807.253333 341.333333M512 85.333333C276.053333 85.333333 85.333333 277.333333 85.333333 512 85.333333 747.52 276.48 938.666667 512 938.666667 747.52 938.666667 938.666667 747.52 938.666667 512 938.666667 276.48 747.52 85.333333 512 85.333333Z\"  /></svg>";

            actionBar.appendChild(web);
        }

        tileArray.push(tile)
    });

    tileContainer.replaceChildren(...tileArray);
}

drawProjectsList(projects);