 const screenWidth = window.innerWidth;
        const columns = Math.ceil(screenWidth / 150) + 16;

        const container = document.querySelector('.bg-container');

        for (let i = 0; i < columns; i++) {
            const col = document.createElement('div');
            col.className = 'col';

            const scroll = document.createElement('div');
            scroll.className = 'scroll ' + (i % 2 === 0 ? 'up' : 'down');

            // change tiles if need to
            for (let t = 0; t < 32; t++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                scroll.appendChild(tile);
            }

            col.appendChild(scroll);
            container.appendChild(col);
        }