const input = document.querySelector('input');
const button = document.querySelector('button');

const place = document.querySelector('#place');
const degrees = document.querySelector('#degrees');
const wind = document.querySelector('#wind');
const img = document.querySelector('img');
const content = document.querySelector('.content');

button.addEventListener("click", () => {
    if (!input.value) return;

    getDataApi();
});

input.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        getDataApi();
    }
});

async function getDataApi() {

    
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&appid=532931f2a1542bf7dc21f5f6f4e26541`;

        try {
            await fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    if (data ?.cod && data.cod === "404") {
                        return alert("Local não encontrado");
                    }

                    loadData(data);

                });

        } catch (error) {
            alert(error)
        }
   
}

function loadData(data) {
    place.innerHTML = `${data.name}, ${data.sys.country}`;
    degrees.innerHTML = `Temperatura: ${Math.floor(data.main.temp)}° C, `;
    img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    wind.innerHTML = `Vento: ${data.wind.speed} m/s, Nuvens: ${data.clouds.all}`;
    content.style.display = "flex";
}