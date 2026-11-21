const Allinks = document.querySelectorAll("nav a");
const Allections = document.querySelectorAll("section");
const searchInput = document.getElementById("apod-date-input");

var dateNow = new Date().toISOString().split("T")[0];

searchInput.value = dateNow;

console.log(dateNow);

Allinks.forEach((link) => {
    link.addEventListener("click", function () {
        Allections.forEach((sec) => {
            sec.classList.add("hidden");
        });

        document
            .getElementById(link.getAttribute("data-section"))
            .classList.remove("hidden");
    });
});

getSpaceToday(dateNow);

async function getSpaceToday(date) {
    document.getElementById("apod-loading").classList.remove("hidden");
    document.getElementById("apod-image").classList.add("hidden");
    document.getElementById("apod-explanation").innerHTML = "loading..........";

    fetch(
        `https://api.nasa.gov/planetary/apod?api_key=g7nTrQ8dtNzLnbkgKFJj9CtzNWCDHcgF6GHQtpjH&date=${date}`
    )
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            console.log(response);

            let myDate = new Date(response.date + "T00:00:00").toLocaleDateString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric",
            });

            console.log(myDate);

            document.getElementById("apod-image").setAttribute("src", response.hdurl);
            document.getElementById("apod-explanation").innerHTML = response.explanation;
            document.getElementById("apod-date").innerHTML = `Astronomy Picture of the Day - ${myDate}`;
            document.getElementById("apod-date-info").innerHTML = response.date;
            document.getElementById("apod-date-detail").innerHTML = response.date;
        })
        .finally(() => {
            document.getElementById("apod-loading").classList.add("hidden");
            document.getElementById("apod-image").classList.remove("hidden");
        });
}

document.getElementById("load-date-btn").addEventListener("click", function () {
    getSpaceToday(searchInput.value);
});
document.getElementById("today-apod-btn").addEventListener("click", function () {
    getSpaceToday(dateNow);
});

getLunches();

function getLunches() {
    fetch(`https://lldev.thespacedevs.com/2.3.0/launches/upcoming/`)
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            console.log(response);

            if (!response.results) {
                document.getElementById("featured-launch").innerHTML = `<p class="text-slate-400">${response.detail || "Could not load launches"}</p>`;
                return;
            }

            console.log(response.results);

            document.getElementById("featured-launch").innerHTML = `
                  <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        ${response.results[0].status.abbrev}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${response.results[0].name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${response.results[0].launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${response.results[0].rocket.configuration.name}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${Math.max(0, Math.ceil((new Date(response.results[0].net) - new Date()) / 86400000))}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${new Date(response.results[0].net).toLocaleDateString("en-us", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${new Date(response.results[0].net).toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit", timeZone: "UTC", timeZoneName: "short" })}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${response.results[0].pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${response.results[0].pad.country?.name || response.results[0].pad.location.country?.name || "N/A"}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${response.results[0].mission?.description || "No description available."}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                         <img src="${response.results[0].image?.image_url}" class="h-full w-full object-cover" alt="">
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            `;

            displayLaunches(response.results);
        });
}

function displayLaunches(launche) {
    let cartona = ``;

    for (let i = 1; i < launche.length; i++) {
        cartona += `   <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
               <img src="${launche[i].image?.image_url}" class="h-full w-full object-cover" alt="">
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 ${launche[i].status.abbrev === "Go" ? "bg-green-500/90" : "bg-yellow-500/90"} text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${launche[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launche[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launche[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${new Date(launche[i].net).toLocaleDateString("en-us", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${new Date(launche[i].net).toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" })} UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launche[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launche[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`;
    }
    document.getElementById("launches-grid").innerHTML = cartona;
}

var allPlanets = [];

const planetColors = {
    mercury: "#eab308",
    venus: "#f97316",
    earth: "#3b82f6",
    mars: "#ef4444",
    jupiter: "#fb923c",
    saturn: "#facc15",
    uranus: "#06b6d4",
    neptune: "#2563eb",
};

const planetDescriptions = {
    mercury:
        "Mercury is the smallest planet in the Solar System and the closest to the Sun. It has almost no atmosphere, so its surface swings between extreme heat during the day and freezing cold at night.",
    venus:
        "Venus is the second planet from the Sun and the hottest planet in the Solar System. Its thick carbon dioxide atmosphere traps heat in a runaway greenhouse effect, and it spins backwards compared to most planets.",
    earth:
        "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of its surface is covered with water, mostly by oceans, seas, and other salt-water bodies.",
    mars:
        "Mars is the fourth planet from the Sun, known as the Red Planet because of the iron oxide on its surface. It has the tallest volcano and the deepest canyon in the Solar System.",
    jupiter:
        "Jupiter is the largest planet in the Solar System, a gas giant more than twice as massive as all the other planets combined. Its Great Red Spot is a storm that has raged for centuries.",
    saturn:
        "Saturn is the sixth planet from the Sun, a gas giant famous for its spectacular system of icy rings. It is the least dense planet and would float in water if a big enough ocean existed.",
    uranus:
        "Uranus is an ice giant that rotates on its side, with an axial tilt of about 98 degrees. Its pale blue-green color comes from methane in its atmosphere.",
    neptune:
        "Neptune is the eighth and farthest known planet from the Sun. This dark, cold ice giant is whipped by supersonic winds, the fastest in the Solar System.",
};

const planetFacts = {
    mercury: [
        "Smallest planet in the Solar System",
        "A year lasts only 88 Earth days",
        "Has no moons and almost no atmosphere",
        "Temperatures range from -180°C to 430°C",
    ],
    venus: [
        "Hottest planet, around 465°C on the surface",
        "Rotates backwards (retrograde rotation)",
        "A day on Venus is longer than its year",
        "Atmosphere is mostly carbon dioxide",
    ],
    earth: [
        "Only known planet with liquid water",
        "Atmosphere contains 78% nitrogen",
        "Magnetic field protects from solar wind",
        "Formed 4.54 billion years ago",
    ],
    mars: [
        "Home of Olympus Mons, the tallest volcano known",
        "Has two small moons, Phobos and Deimos",
        "A day on Mars is about 24.6 hours",
        "Its red color comes from iron oxide",
    ],
    jupiter: [
        "Largest planet in the Solar System",
        "The Great Red Spot is a giant storm",
        "Has the shortest day of all planets, about 10 hours",
        "Has a faint ring system",
    ],
    saturn: [
        "Famous for its bright system of rings",
        "Least dense planet in the Solar System",
        "Has more than 80 known moons",
        "Titan, its largest moon, has a thick atmosphere",
    ],
    uranus: [
        "Rotates on its side with a 98° tilt",
        "Coldest planetary atmosphere in the Solar System",
        "Has 13 known rings",
        "Discovered with a telescope in 1781",
    ],
    neptune: [
        "Farthest planet from the Sun",
        "Winds reach more than 2,000 km/h",
        "Triton, its largest moon, orbits backwards",
        "Discovered through mathematical predictions",
    ],
};

getPlanets();

function getPlanets() {
    fetch(`https://solar-system-opendata-proxy.vercel.app/api/planets`)
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            console.log(response.bodies);

            if (!response.bodies) {
                console.log(response);
                return;
            }

            displayPlanets(response.bodies);
        });
}

function displayPlanets(plantes) {
    const onlyPlanets = plantes.filter((p) => p.isPlanet);

    allPlanets = (onlyPlanets.length ? onlyPlanets : plantes)
        .slice()
        .sort((a, b) => a.semimajorAxis - b.semimajorAxis);

    let demo = ``;

    for (let index = 0; index < allPlanets.length; index++) {
        const name = allPlanets[index].englishName;
        const key = name.toLowerCase();
        const color = planetColors[key] || "#64748b";
        const au = (allPlanets[index].semimajorAxis / 149597870.7).toFixed(2);

        demo += `
            <div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="${key}"
              style="--planet-color: ${color}"
              onmouseover="this.style.borderColor='${color}80'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="./assets/images/${key}.png"
                  alt="${name}"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">${name}</h4>
              <p class="text-xs text-slate-400 text-center">${au} AU</p>
            </div>`;
    }

    document.getElementById("planets-grid").innerHTML = demo;

    const cards = document.querySelectorAll(".planet-card");

    cards.forEach((card) => {
        card.addEventListener("click", function () {
            cards.forEach((c) => {
                c.style.outline = "none";
            });

            card.style.outline = `2px solid ${card.style.getPropertyValue("--planet-color")}`;

            showPlanetDetails(card.getAttribute("data-planet-id"));

            document
                .getElementById("planet-detail-name")
                .scrollIntoView({ behavior: "smooth", block: "center" });
        });
    });

    showPlanetDetails("earth");
}

function showPlanetDetails(planetId) {
    const planet = allPlanets.find((p) => p.englishName.toLowerCase() === planetId);

    if (!planet) {
        return;
    }

    console.log(planet);

    document.getElementById("planet-detail-image").setAttribute("src", `./assets/images/${planetId}.png`);
    document.getElementById("planet-detail-image").setAttribute("alt", `${planet.englishName} planet`);
    document.getElementById("planet-detail-name").innerHTML = planet.englishName;
    document.getElementById("planet-detail-description").innerHTML =
        planetDescriptions[planetId] || "No description available.";

    document.getElementById("planet-distance").innerHTML = `${(planet.semimajorAxis / 1000000).toFixed(1)}M km`;
    document.getElementById("planet-radius").innerHTML = `${planet.meanRadius.toLocaleString("en-us")} km`;
    document.getElementById("planet-mass").innerHTML = planet.mass
        ? `${planet.mass.massValue.toFixed(2)} × 10${toSuperscript(planet.mass.massExponent)} kg`
        : "N/A";
    document.getElementById("planet-density").innerHTML = `${planet.density} g/cm³`;
    document.getElementById("planet-orbital-period").innerHTML = `${planet.sideralOrbit.toLocaleString("en-us", { maximumFractionDigits: 1 })} days`;
    document.getElementById("planet-rotation").innerHTML = `${Math.abs(planet.sideralRotation).toFixed(1)} hours`;
    document.getElementById("planet-moons").innerHTML = planet.moons ? planet.moons.length : 0;
    document.getElementById("planet-gravity").innerHTML = `${planet.gravity} m/s²`;

    document.getElementById("planet-discoverer").innerHTML = planet.discoveredBy || "Known since antiquity";
    document.getElementById("planet-discovery-date").innerHTML = planet.discoveryDate || "Ancient";
    document.getElementById("planet-body-type").innerHTML = planet.bodyType || "Planet";
    document.getElementById("planet-volume").innerHTML = planet.vol
        ? `${planet.vol.volValue.toFixed(2)} × 10${toSuperscript(planet.vol.volExponent)} km³`
        : "N/A";

    document.getElementById("planet-perihelion").innerHTML = `${(planet.perihelion / 1000000).toFixed(1)}M km`;
    document.getElementById("planet-aphelion").innerHTML = `${(planet.aphelion / 1000000).toFixed(1)}M km`;
    document.getElementById("planet-eccentricity").innerHTML = planet.eccentricity.toFixed(4);
    document.getElementById("planet-inclination").innerHTML = `${planet.inclination.toFixed(2)}°`;
    document.getElementById("planet-axial-tilt").innerHTML = `${planet.axialTilt}°`;
    document.getElementById("planet-temp").innerHTML = `${Math.round(planet.avgTemp - 273.15)}°C`;
    document.getElementById("planet-escape").innerHTML = `${(planet.escape / 1000).toFixed(1)} km/s`;

    const facts = planetFacts[planetId] || [];
    let demo = ``;

    for (let index = 0; index < facts.length; index++) {
        demo += `
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300">${facts[index]}</span>
                  </li>`;
    }

    document.getElementById("planet-facts").innerHTML = demo;
}

function toSuperscript(number) {
    const supers = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", "-": "⁻" };

    return String(number)
        .split("")
        .map((ch) => supers[ch] || ch)
        .join("");
}