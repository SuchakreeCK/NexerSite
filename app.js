const A = "assets/";
const page = document.body.dataset.page;

const navItems = [
  ["home", "Home", "index.html"],
  ["awards", "Awards", "awards.html"],
  ["members", "Members", "members.html", [
    ["Members 2026–27", "members.html?season=2026-27"], ["Members 2025–26", "members.html?season=2025-26"], ["Members 2024–25", "members.html?season=2024-25"], ["Members 2023–24", "members.html?season=2023-24"], ["Members 2022–23", "members-group.html"], ["Members 2021–22", "members-2021-22.html"], ["Members 2020–21", "members-2020-21.html"]
  ]],
  ["robots", "Robots", "robots.html"],
  ["sponsors", "Sponsors", "sponsors.html", [
    ["Sponsors 2026–27", "sponsors.html?season=2026-27"], ["Sponsors 2025–26", "sponsors.html?season=2025-26"], ["Sponsors 2024–25", "sponsors.html?season=2024-25"]
  ]]
];

const memberSeasonLinks = [
  {season:"2020-21",href:"members-2020-21.html"},
  {season:"2021-22",href:"members-2021-22.html"},
  {season:"2022-23",href:"members-group.html"},
  {season:"2023-24",href:"members.html?season=2023-24"},
  {season:"2024-25",href:"members.html?season=2024-25"},
  {season:"2025-26",href:"members.html?season=2025-26"},
  {season:"2026-27",href:"members.html?season=2026-27"}
];
const sponsorSeasonLinks = [
  {season:"2024-25",href:"sponsors.html?season=2024-25"},
  {season:"2025-26",href:"sponsors.html?season=2025-26"},
  {season:"2026-27",href:"sponsors.html?season=2026-27"}
];
const seasonThemes={
  "2026-27":"BIOBUZZ",
  "2025-26":"DECODE",
  "2024-25":"INTO THE DEEP",
  "2023-24":"CENTERSTAGE",
  "2022-23":"POWERPLAY",
  "2021-22":"FREIGHT FRENZY",
  "2020-21":"ULTIMATE GOAL"
};
function formatSeasonTitle(season){return `${season.replace("-","–")} ${seasonThemes[season]} Season`}

function renderSeasonArrows(seasons,currentSeason,sectionName){
  const header=document.querySelector(".page-title--season");
  const currentIndex=seasons.findIndex(item=>item.season===currentSeason);
  if(!header||currentIndex<0)return;
  const previous=seasons[currentIndex-1];
  const next=seasons[currentIndex+1];
  header.classList.add("page-title--with-season-nav");
  const rightArrow=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  const leftArrow=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>`;
  if(previous)header.insertAdjacentHTML("beforeend",`<a class="season-arrow season-arrow--next" href="${previous.href}" aria-label="Previous ${sectionName} season: ${previous.season.replace("-","–")}" title="${previous.season.replace("-","–")}">${rightArrow}</a>`);
  if(next)header.insertAdjacentHTML("beforeend",`<a class="season-arrow season-arrow--previous" href="${next.href}" aria-label="Next ${sectionName} season: ${next.season.replace("-","–")}" title="${next.season.replace("-","–")}">${leftArrow}</a>`);
}

const navIcons = {
  home: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  awards: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  members: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  robots: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="16" y1="16" x2="16.01" y2="16"/></svg>`,
  sponsors: `<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
};

function renderHeader() {
  document.querySelector("#site-header").innerHTML = `
    <header class="site-header"><div class="site-header__inner">
      <a class="site-brand" href="index.html">NEXER</a>
      <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="site-nav" aria-label="Primary navigation">
        <div class="site-nav__list">
          ${navItems.map(([id, label, href, children]) => {
            const isActive = page === id || (id === "members" && page === "members-group");
            return `<div class="site-nav__item${children ? " has-subnav" : ""}${isActive ? " active-parent" : ""}">
              <div class="site-nav__link-wrap">
                <a class="${isActive ? "active" : ""}" href="${href}">
                  ${navIcons[id] || ""}
                  <span>${label}</span>
                </a>
                ${children ? `<button class="subnav-toggle" type="button" aria-label="Toggle ${label} seasons" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button>` : ""}
              </div>
              ${children ? `<div class="site-subnav">${children.map(([text, url]) => `<a href="${url}">${text}</a>`).join("")}</div>` : ""}
            </div>`;
          }).join("")}
        </div>
      </nav>
      <div class="nav-backdrop"></div>
    </div></header>`;
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const backdrop = document.querySelector(".nav-backdrop");

  function closeNav() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("nav-open");
  }

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    nav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);
  });

  if (backdrop) {
    backdrop.addEventListener("click", closeNav);
  }

  document.querySelectorAll(".subnav-toggle").forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      const item = btn.closest(".site-nav__item");
      const isExpanded = item.classList.toggle("subnav-open");
      btn.setAttribute("aria-expanded", String(isExpanded));
    });
  });

  nav.addEventListener("click", event => {
    if (event.target.closest("a")) {
      closeNav();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      closeNav();
    }
  });
}

function renderFooter() {
  document.querySelector("#site-footer").innerHTML = `
    <footer class="site-footer"><div class="site-footer__inner">
      <div class="footer-contact">
        <div class="footer-title"><img src="${A}branding/nexer-logo.png" alt=""><span>NEXER #22641</span></div>
        <address>117 Kaeonawarat Rd, Wat Ket,<br>Mueang Chiang Mai District, Chiang Mai 50000</address>
        <a href="mailto:ftc.nexer22641@gmail.com">Email: ftc.nexer22641@gmail.com</a>
        <a href="https://www.instagram.com/nexer22641/" target="_blank" rel="noopener">Instagram: nexer22641</a>
        <div class="footer-social"><a class="footer-social__instagram" href="https://www.instagram.com/nexer22641/" target="_blank" rel="noopener" aria-label="Instagram: nexer22641"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"></rect><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"></circle><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"></circle></svg></a><a href="https://www.youtube.com/@ftc.thunderbolt22641" target="_blank" rel="noopener" aria-label="YouTube">▶</a></div>
      </div>
      <div class="footer-thanks"><h2>Thank you for our sponsors!</h2><div class="footer-logos footer-logos--current"><img src="${A}sponsors/sponsor-fit-2627-tissus.png" alt="TISSUS Design Studio"><img src="${A}sponsors/sponsor-fit-2627-ozone360.png" alt="OZONE360 AI &amp; Robotics Solutions"><img src="${A}sponsors/sponsor-fit-2627-nombangkruay.png" alt="Nombangkruay"><img src="${A}sponsors/sponsor-fit-2526-08.png" alt="ATVISION Multimedia"><img src="${A}sponsors/sponsor-fit-partner-ban-achid.png" alt="Ban Achid"></div></div>
    </div></footer>`;
}

const awards = [
  {year:"2025-2026",game:"DECODE",event:"Thailand Championship (THCMP)",eventUrl:"https://ftc-events.firstinspires.org/2025/THCMP",team:"as FTC team Thunderbolt #22641",wins:["🎖️ Connect Award Winner","23rd place (qualifiers)"],images:["awards/award-2526-1.jpg","awards/award-2526-2.jpg","awards/award-2526-3.jpg"],bg:"backgrounds/bg-decode.jpg",peach:true},
  {year:"2024-2025",game:"INTO THE DEEP",event:"Thailand Championship(THMMOS)",eventUrl:"https://ftc-events.firstinspires.org/2024/THMMOS",team:"as FTC team Thunderbolt #22641",wins:["🎖️ Motivate Award Winner","🎖️ Popular Vote Award Winner","6th place (qualifiers)"],images:["awards/award-2425-1.jpg","awards/award-2425-2.jpg","awards/award-2425-3.jpg"],bg:"backgrounds/bg-into-deep.png",peach:true},
  {year:"2023-2024",game:"CENTERSTAGE",event:"Thailand Championship (THCMP)",eventUrl:"https://ftc-events.firstinspires.org/2023/THCMP",team:"as FTC team Thorium #24797",wins:["13th place (qualifiers)"],images:["awards/award-2324-1.png","awards/award-2324-2.png","awards/award-2324-3.png"],bg:"backgrounds/bg-centerstage.jpg"},
  {year:"2022-2023",game:"POWERPLAY",event:"FIRST Championship - Houston - World Championship - FIRST Tech Challenge - Franklin Division(FTCCMP1FRAN)",eventUrl:"https://ftc-events.firstinspires.org/2022/FTCCMP1FRAN",team:"as FTC team Ezreal #22641",wins:["34th place (qualifiers)"],images:["awards/award-2223-1.jpg","awards/award-2223-2.jpg","awards/award-2223-3.jpg"],bg:"backgrounds/bg-powerplay.jpg",travel:true},
  {year:"2022-2023",game:"POWERPLAY",event:"Thailand Championship(THCMP)",eventUrl:"https://ftc-events.firstinspires.org/2022/THCMP",team:"as FTC team Ezreal #22641",wins:["🏆 Winning Alliance - Captain","🎖️ Inspire Award Winner","🎖️ Connect Award Winner","1st place (qualifiers)"],images:["awards/award-2223-th-1.jpg","awards/award-2223-th-2.jpg","awards/award-2223-th-3.jpg"],bg:"backgrounds/bg-powerplay.jpg"},
  {year:"2021-2022",game:"Freight Frenzy",event:"Thailand Championship(THCMP)",eventUrl:"https://ftc-events.firstinspires.org/2021/THCMP",team:"as FTC team Ezreal #21053",wins:["🏆 Winning Alliance - Captain","3rd place (qualifiers)"],images:["awards/award-2122-1.jpg","awards/award-2122-2.jpg","awards/award-2122-3.jpg"],bg:"backgrounds/bg-freight.jpg"},
  {year:"2020-2021",game:"ULTIMATE GOAL",event:"Thailand Championship",team:"as FTC team Ezreal #2214",wins:["🥈 1st Runner Up","🎖️ Judges Awards Winner","1st place (qualifiers)"],images:["awards/award-2021-1.jpg","awards/award-2021-2.jpg","awards/award-2021-3.jpg"],bg:"backgrounds/bg-ultimate.jpg"}
];

function renderAwards() {
  document.querySelector("#awards-list").innerHTML = awards.map(item => `
    <section class="award-block ${item.peach ? "award-block--peach" : ""}" style="background-image:linear-gradient(180deg, rgba(2,6,15,0.88) 0%, rgba(3,10,24,0.84) 45%, rgba(1,4,12,0.94) 100%),url('${A + item.bg}')"><div class="award-block__inner">
      <div class="award-copy"><h2>${item.year} ${item.game}</h2><p class="award-event">${item.eventUrl ? `<a href="${item.eventUrl}" target="_blank" rel="noopener" aria-label="${item.event} official FIRST event page">${item.travel ? `<span class="award-event__travel" role="img" aria-label="Flight to the United States">🛫<span class="award-event__flag" aria-hidden="true">🇺🇸</span></span> ` : ""}${item.event}</a>` : `<u>${item.event}</u>`}</p><p>${item.team}</p><ul>${item.wins.map(win => `<li>${win}</li>`).join("")}</ul></div>
      <div class="award-gallery">${item.images.map((img, i) => `<img src="${A + img}" alt="${item.game} event photo ${i + 1}" loading="lazy">`).join("")}</div>
    </div></section>`).join("");
}

const members = {
  "2026-27":[["Enzo Franckhauser","Team Captain/Builder"],["Arthittaya Hemphichit","Graphic Designer"],["Karanwarat Chaivivat","Graphic Designer"],["Pupakorn Tiantong","3D Designer"],["Jaranpong Kongsila","Driver/3D Designer"],["Suwipada Kaewkullaya","Graphic Designer"],["Pawin Thakham","3D Designer"],["Chaopraya Areesrisom","Graphic Designer"],["Plin Sriyawong","Builder"],["Tinn Suktakchan","Programmer"],["Sirivarang Phannarong","Graphic Designer"],["Chatnara Wandee","Graphic Designer"],["Peerapas Boonjinda","Programmer"],["Kornjiraphat Boonpeng","Accountant"],["Wuttiphat Nantakarn","Driver"]],
  "2025-26":[["Atthawee Waritwongkoson","Team Captain/Builder"],["Thanakrit Inmong","3D Designer/Builder"],["Nattakorn Nantakarn","Programmer"],["Anyarin Waritwongkoson","Graphic Designer"],["Jirawat Weeradejpipat","3D Designer/Builder"],["Chotichaya Mookkaew","Graphic Designer"],["Peerapas Boonjinda","Programmer"],["Pichaya Khampanya","Builder"],["Pupakorn Tiantong","3D Designer"],["Tanakrit Wongwan","Programmer"]],
  "2024-25":[["Worametee Prasarnsieng","Team Captain"],["Pupakorn Tiantong","3D Designer"],["Thida Jopanya","Driver"],["Peerapas Boonjinda","Programmer"],["Nattakorn Nantakarn","Programmer/Driver"],["Ratthathee Laipaiboon","Builder"],["Atthawee Waritwongkoson","Builder"],["Rookoonsiri Wongkompan","Graphic Designer"],["Chinchawakorn Changesom","Programmer"],["Chawanakorn Chaiyokad","Graphic Designer"]],
  "2023-24":[["Kantapon Samniengdee","Team Captain"],["Viriya Chueafangchon","Co-Team Captain"],["Carl Tidtijumreonporn","Programmer"],["Naruebet Sewaka","Builder"],["Nattakorn Nantakarn","Programmer"],["Attawee Waritwongkoson","Builder"],["Pakorn Leckngam","Producer"],["Chawanakorn Chaiyokad","Graphic Designer"],["Thida Jopanya","Driver"],["Thanchanit Klinhawharn","Graphic Designer"]]
};
const memberPrefixes={"2026-27":"members/member-fit-2627-","2025-26":"members/member-fit-2526-","2024-25":"members/member-fit-2425-","2023-24":"members/member-fit-2324-"};
const memberBackgrounds={"2026-27":"backgrounds/bg-members.jpg","2025-26":"backgrounds/bg-decode.jpg","2024-25":"backgrounds/bg-into-deep.png","2023-24":"backgrounds/bg-centerstage.jpg"};
function memberVisualOrder(length){const rows=length===15?3:2;return Array.from({length},(_,displayIndex)=>(displayIndex%5)*rows+Math.floor(displayIndex/5))}
function memberNameLines(name){const [first,...last]=name.trim().split(/\s+/);return `<span>${first}</span><span>${last.join(" ")}</span>`}
function renderMembers(){
  const requested=new URLSearchParams(location.search).get("season")||"2026-27";const season=members[requested]?requested:"2026-27";
  const membersPage=document.querySelector(".members-page");
  membersPage.dataset.season=season;
  membersPage.style.backgroundImage=`linear-gradient(180deg, rgba(2,6,15,0.90) 0%, rgba(3,10,24,0.85) 45%, rgba(1,4,12,0.95) 100%),url("${A+memberBackgrounds[season]}")`;
  document.querySelector("#members-season-title").textContent=formatSeasonTitle(season);
  renderSeasonArrows(memberSeasonLinks,season,"member");
  document.querySelector("#member-season-switcher").innerHTML=Object.keys(members).map(key=>`<a class="${key===season?"active":""}" href="members.html?season=${key}">${key.replace("-","–")}</a>`).join("");
  const items=members[season];
  const visualOrder=season==="2023-24"?Array.from({length:items.length},(_,index)=>index):memberVisualOrder(items.length);
  document.querySelector("#member-grid").innerHTML=visualOrder.map(sourceIndex=>{const number=String(sourceIndex+1).padStart(2,"0");return `<article class="member-card"><div class="member-photo"><img src="${A+memberPrefixes[season]+number}.png" alt="${items[sourceIndex][0]}"></div><h2>${memberNameLines(items[sourceIndex][0])}</h2><p>${items[sourceIndex][1]}</p></article>`}).join("");
}

const robots = [
  {year:"2025-2026",name:"Bolt",game:"DECODE",image:"robots/robot-bolt.png",bg:"backgrounds/bg-decode.jpg",description:"Designed for precision, stability and strength.",gold:true,link:"https://a360.co/4pQuiEK",download:"For the download use the password: gassamdon"},
  {year:"2024-2025",name:"Atom",game:"Into the Deep",image:"robots/robot-atom.png",bg:"backgrounds/bg-into-deep.png",description:"Designed for agility, precision, and modular upgrades.",gold:true,link:"https://a360.co/3VqAQgA"},
  {year:"2023-2024",name:"Henry",game:"CENTERSTAGE",image:"robots/robot-henry.png",bg:"backgrounds/bg-centerstage.jpg",description:"Designed for speed, precision, and efficiency."},
  {year:"2022-2023",name:"Alpha",game:"POWERPLAY",image:"robots/robot-alpha.png",bg:"backgrounds/bg-powerplay.jpg",description:"Designed for agility, compactness and reliability."},
  {year:"2021-2022",name:"Frank",game:"Freight Frenzy",image:"robots/robot-frank.png",bg:"backgrounds/bg-freight.jpg",description:"Designed for precision, stability and strength."},
  {year:"2020-2021",name:"George",game:"ULTIMATE GOAL",image:"robots/robot-george.png",bg:"backgrounds/bg-ultimate.jpg",description:"Designed to be concise, accurate, and easy to maintain."}
];
function renderRobots(){document.querySelector("#robot-grid").innerHTML=robots.map(robot=>`<article class="robot-season ${robot.gold?"robot-season--gold":""}" style="background-image:linear-gradient(180deg, rgba(2,6,15,0.88) 0%, rgba(3,10,24,0.84) 45%, rgba(1,4,12,0.94) 100%),url('${A+robot.bg}')"><h2>${robot.year}</h2><p class="robot-intro">Meet <strong>\"${robot.name}\"</strong>, our ${robot.year} FIRST® Tech Challenge season '${robot.game}' robot.</p><div class="robot-card"><img src="${A+robot.image}" alt="${robot.name} robot">${robot.link?`<a class="robot-pill" href="${robot.link}" target="_blank" rel="noopener">${robot.name} : ${robot.year}</a>`:`<span class="robot-pill">${robot.name} : ${robot.year}</span>`}<p class="robot-description">${robot.description}</p>${robot.download?`<p class="robot-download">${robot.download}</p>`:""}</div></article>`).join("")}

function renderSponsors(){
  const requested=new URLSearchParams(location.search).get("season")||"2026-27";const season=["2026-27","2025-26","2024-25"].includes(requested)?requested:"2026-27";
  document.querySelector("#sponsors-season-title").textContent=formatSeasonTitle(season);
  renderSeasonArrows(sponsorSeasonLinks,season,"sponsor");
  document.querySelector("#sponsor-season-switcher").innerHTML=["2026-27","2025-26","2024-25"].map(key=>`<a class="${key===season?"active":""}" href="sponsors.html?season=${key}">${key.replace("-","–")}</a>`).join("");
  const board=document.querySelector("#sponsor-board");
  const sponsorBackgrounds={"2026-27":"backgrounds/bg-members.jpg","2025-26":"backgrounds/bg-decode.jpg","2024-25":"backgrounds/bg-into-deep.png"};
  const seasonBackground=A+sponsorBackgrounds[season];
  document.querySelector(".sponsors-page").style.backgroundImage=`linear-gradient(180deg, rgba(2,6,15,0.88) 0%, rgba(3,10,24,0.84) 40%, rgba(1,4,12,0.95) 100%),url("${seasonBackground}")`;
  board.style.backgroundImage=`linear-gradient(180deg, rgba(2,7,18,0.90) 0%, rgba(3,10,24,0.90) 100%),url("${seasonBackground}")`;
  const sponsorOrder=[3,1,2,4,5,10,11,6,7,8,9,12,13];
  const outlinedSponsors=new Set([1,9,11,13]); // 80% dark-edge cutoff, plus the tree-logo exception.
  const sponsorFile=number=>number===3?"sponsor-featured-2526-03.png":`sponsor-fit-2526-${String(number).padStart(2,"0")}.png`;
  if(season==="2026-27")board.innerHTML=`<div class="sponsor-current sponsor-current--grid"><img src="${A}sponsors/sponsor-fit-2627-tissus.png" alt="TISSUS Design Studio"><img src="${A}sponsors/sponsor-fit-2627-ozone360.png" alt="OZONE360 AI &amp; Robotics Solutions"><img src="${A}sponsors/sponsor-fit-2627-nombangkruay.png" alt="Nombangkruay"><img src="${A}sponsors/sponsor-fit-2526-08.png" alt="ATVISION Multimedia"><img src="${A}sponsors/sponsor-fit-partner-ban-achid.png" alt="Ban Achid"></div>`;
  else if(season==="2025-26")board.innerHTML=`<div class="sponsor-grid">${sponsorOrder.map(number=>`<div class="sponsor-logo${outlinedSponsors.has(number)?" sponsor-logo--outlined":""}"><img src="${A}sponsors/${sponsorFile(number)}" alt="NEXER sponsor ${number}"></div>`).join("")}</div>`;
  else board.innerHTML=`<div class="sponsor-composite"><img src="${A}sponsors/sponsor-2425.png" alt="NEXER 2024–2025 sponsors"></div>`;
}

renderHeader();renderFooter();
if(page==="awards")renderAwards();if(page==="members")renderMembers();if(page==="members-group")renderSeasonArrows(memberSeasonLinks,document.body.dataset.season,"member");if(page==="robots")renderRobots();if(page==="sponsors")renderSponsors();
