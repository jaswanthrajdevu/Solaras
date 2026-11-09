const planets=window.SOLARA_PLANETS;
const missions=window.SOLARA_MISSIONS;
const planetStrip=document.getElementById('planetStrip');
Object.entries(planets).forEach(([name,p])=>{if(name==='Sun')return;const b=document.createElement('button');b.className='strip-card';b.innerHTML=`${name}<span>${p.tagline}</span>`;b.onclick=event=>{selectPlanet(name);if(event.detail===0)document.getElementById('previewExplore').focus()};b.onfocus=()=>setPlanetPreview(name);planetStrip.appendChild(b)});
let focusedPlanet='Earth';
let selectedPlanet='Earth';
let hasPlanetSelection=false;
const planetOrder=Object.keys(planets).filter(name=>name!=='Sun');
function setPlanetPreview(name){name=name||selectedPlanet;focusedPlanet=name;document.getElementById('previewName').textContent=name;document.getElementById('previewTagline').textContent=planets[name].tagline;document.getElementById('previewExplore').innerHTML=`Explore ${name} <span aria-hidden="true">→</span>`;document.getElementById('previewExplore').hidden=!hasPlanetSelection||name!==selectedPlanet;document.getElementById('planetIndex').textContent=name==='Sun'?'STAR / 08':`${String(planetOrder.indexOf(name)+1).padStart(2,'0')} / 08`;document.getElementById('solarStage').dataset.focusedPlanet=name}
let solarSystem=null;
function selectPlanet(name,focus=true){selectedPlanet=name;hasPlanetSelection=true;setPlanetPreview(name);if(solarSystem){if(focus)solarSystem.focusPlanet(name);document.getElementById('returnToSystem').hidden=false}}
const solarStage=document.getElementById('solarStage');
solarSystem=window.SOLARA_createSolarSystem({stage:solarStage,canvas:document.getElementById('solarCanvas'),onHover:name=>setPlanetPreview(name),onSelect:name=>selectPlanet(name,false),onError:error=>{console.error(error);const status=document.getElementById('solarFallbackStatus');status.textContent=error.message;status.hidden=false}});
if(solarSystem){solarStage.classList.add('is-3d');solarStage.querySelectorAll('.orbit-path,.sun').forEach(node=>node.setAttribute('aria-hidden','true'));solarStage.querySelectorAll('.planet-node').forEach(node=>node.tabIndex=-1)}
document.querySelectorAll('.planet-node').forEach(node=>{const name=node.dataset.planet;node.addEventListener('mouseenter',()=>setPlanetPreview(name));node.addEventListener('focus',()=>setPlanetPreview(name));node.addEventListener('click',event=>{selectPlanet(name);if(event.detail===0)document.getElementById('previewExplore').focus()})});
solarStage.addEventListener('mouseleave',()=>setPlanetPreview(selectedPlanet));
solarStage.addEventListener('focusout',event=>{if(!solarStage.contains(event.relatedTarget))setPlanetPreview(selectedPlanet)});
document.getElementById('previewExplore').addEventListener('click',()=>openPlanet(focusedPlanet));
const explorerTabs=document.getElementById('explorerTabs');
function switchExplorerTab(tabName,focus=false){const tab=[...explorerTabs.querySelectorAll('[role="tab"]')].find(item=>item.dataset.tab===tabName);if(!tab)return;explorerTabs.querySelectorAll('[role="tab"]').forEach(item=>{const active=item===tab;item.classList.toggle('active',active);item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active});if(focus)tab.focus()}
explorerTabs.addEventListener('click',event=>{const tab=event.target.closest('[role="tab"]');if(tab)switchExplorerTab(tab.dataset.tab)});
explorerTabs.addEventListener('keydown',event=>{const tabs=[...explorerTabs.querySelectorAll('[role="tab"]')];const current=tabs.indexOf(document.activeElement);let next=current;if(event.key==='ArrowRight')next=(current+1)%tabs.length;else if(event.key==='ArrowLeft')next=(current-1+tabs.length)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();switchExplorerTab(tabs[next].dataset.tab,true)});
function pageMode(id){document.querySelectorAll('main>.page').forEach(p=>p.classList.remove('active','active-page'));document.getElementById(id).classList.add('active');if(id==='home')document.getElementById('home').classList.add('active-page');solarSystem?.setActive(id==='home');window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
function openPlanet(name){const p=planets[name];selectedPlanet=name;setPlanetPreview(name);document.getElementById('detailName').textContent=name;document.getElementById('detailTagline').textContent=p.tagline;document.getElementById('detailDescription').textContent=p.description;document.getElementById('detailEyebrow').textContent=name==='Sun'?'STELLAR PROFILE':'PLANETARY PROFILE';const visual=document.getElementById('detailPlanet');visual.className='detail-planet '+name.toLowerCase()+'-large';document.getElementById('statGrid').innerHTML=Object.entries(p.facts).map(([k,v])=>`<div class="stat"><span>${k}</span><strong>${v}</strong></div>`).join('');document.getElementById('structurePlanetName').textContent=name;document.getElementById('atmospherePlanetName').textContent=name;document.getElementById('moonsPlanetName').textContent=name;renderStructure(name);renderAtmosphere(p);renderMoons(p);switchExplorerTab('overview');pageMode('planetDetail');document.getElementById('tab-overview').focus()}
const layerPalette=['#b8c2d9','#d77d59','#ed9c58','#ffd17a','#9bcde8'];
function renderStructure(name){const layers=planets[name].layers;const svg=document.getElementById('crossSection');const selector=document.getElementById('layerSelector');svg.replaceChildren();selector.replaceChildren();svg.setAttribute('viewBox','0 0 300 300');const title=document.createElementNS('http://www.w3.org/2000/svg','title');title.textContent=`${name} internal structure. Select a layer or region.`;svg.appendChild(title);const radiusStart=120;const radiusStep=layers.length===4?30:Math.min(34,90/layers.length);let selectedIndex=Math.max(0,layers.findIndex(layer=>layer.name.toLowerCase()==='crust'));function selectLayer(index){selectedIndex=index;svg.querySelectorAll('.structure-ring').forEach((ring,i)=>{ring.classList.toggle('selected',i===index);ring.classList.toggle('secondary',i!==index);ring.setAttribute('aria-pressed',String(i===index))});selector.querySelectorAll('button').forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index))});renderLayerInfo(layers[index],index,layers.length)}layers.forEach((layer,index)=>{const ring=document.createElementNS('http://www.w3.org/2000/svg','circle');ring.setAttribute('cx','150');ring.setAttribute('cy','150');ring.setAttribute('r',String(radiusStart-index*radiusStep));ring.setAttribute('fill','none');ring.setAttribute('stroke',layerPalette[index%layerPalette.length]);ring.setAttribute('stroke-width',String(Math.max(radiusStep-3,13)));ring.setAttribute('role','button');ring.setAttribute('tabindex','0');ring.setAttribute('aria-label',`Select ${layer.name}`);ring.setAttribute('aria-pressed','false');ring.classList.add('structure-ring');ring.dataset.layerIndex=String(index);ring.addEventListener('click',()=>selectLayer(index));ring.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();selectLayer(index)}});svg.appendChild(ring);const button=document.createElement('button');button.type='button';button.textContent=layer.name;button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>selectLayer(index));selector.appendChild(button)});selectLayer(selectedIndex)}
function renderLayerInfo(layer,index,total){const info=document.getElementById('layerInfo');info.replaceChildren();const eyebrow=document.createElement('p');eyebrow.className='eyebrow';eyebrow.textContent=`LAYER ${String(index+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;const heading=document.createElement('h4');heading.textContent=layer.name;const description=document.createElement('p');description.className='layer-description';description.textContent=layer.description;const details=document.createElement('dl');[['Composition',layer.composition],['Temperature',layer.temperature],['Physical state',layer.state],['Depth',layer.depth]].forEach(([label,value])=>{const term=document.createElement('dt');term.textContent=label;const detail=document.createElement('dd');detail.textContent=value||'Not available in the current data.';details.append(term,detail)});info.append(eyebrow,heading,description,details)}
function renderAtmosphere(planet){const content=document.getElementById('atmosphereContent');content.replaceChildren();const atmosphere=planet.atmosphere;if(!atmosphere){content.textContent='Atmosphere information is not available in the current data.';return}const summary=document.createElement('p');summary.className='explorer-summary';summary.textContent=atmosphere.summary;const heading=document.createElement('h4');heading.textContent='Known components';const list=document.createElement('ul');list.className='composition-list';(atmosphere.composition||[]).forEach(item=>{const row=document.createElement('li');row.textContent=item;list.appendChild(row)});content.append(summary);if(list.childElementCount)content.append(heading,list);else content.append(emptyExplorerMessage('Composition details are not available in the current data.'))}
function renderMoons(planet){const content=document.getElementById('moonsContent');content.replaceChildren();const moons=planet.moons;if(!moons){content.textContent='Moon information is not available in the current data.';return}const count=document.createElement('p');count.className='moon-count';count.textContent=moons.count||'Count not provided';const summary=document.createElement('p');summary.className='explorer-summary';summary.textContent=moons.summary||'Moon details are not available in the current data.';content.append(count,summary);if(moons.notable?.length){const list=document.createElement('ul');list.className='moon-list';moons.notable.forEach(moon=>{const item=document.createElement('li');item.textContent=moon;list.appendChild(item)});content.appendChild(list)}else if(moons.count!=='0'&&moons.count!=='Not applicable')content.appendChild(emptyExplorerMessage('Notable moon details are not available in the current data.'))}
function emptyExplorerMessage(message){const empty=document.createElement('p');empty.className='explorer-empty';empty.textContent=message;return empty}
document.getElementById('backToSpace').onclick=()=>{selectedPlanet='Earth';hasPlanetSelection=false;setPlanetPreview('Earth');solarSystem?.returnToSystem();document.getElementById('returnToSystem').hidden=true;pageMode('home');document.getElementById('startExplore').focus()};document.getElementById('returnToSystem').onclick=()=>{selectedPlanet='Earth';hasPlanetSelection=false;setPlanetPreview('Earth');solarSystem?.returnToSystem();document.getElementById('returnToSystem').hidden=true};document.getElementById('startExplore').onclick=()=>document.getElementById('solarStage').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});document.getElementById('tourBtn').onclick=()=>openPlanet('Earth');
const menu=document.getElementById('mobileMenu');const menuToggle=document.getElementById('menuToggle');function setMobileMenuOpen(open){menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu')}function nav(){document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1);if(['home','missions','lab','challenge'].includes(id)){e.preventDefault();pageMode(id);setMobileMenuOpen(false)}}))}nav();
const missionAgencyFilter=document.getElementById('missionAgencyFilter');
const missionTargetFilter=document.getElementById('missionTargetFilter');
const missionCategoryFilter=document.getElementById('missionCategoryFilter');
const missionTimeline=document.getElementById('missionTimeline');
const missionDetail=document.getElementById('missionDetail');
const missionResultCount=document.getElementById('missionResultCount');
let visibleMissions=[];
let selectedMissionId=null;

function createMissionElement(tag,className,text){
 const element=document.createElement(tag);
 if(className)element.className=className;
 if(text!==undefined)element.textContent=text;
 return element;
}

function renderMissionDetail(mission){
 missionDetail.replaceChildren();
 const header=createMissionElement('header','mission-detail-header');
 const headingBlock=createMissionElement('div','');
 const kind=createMissionElement('p','eyebrow',mission.category==='mission'?'MISSION PROFILE':'DISCOVERY NOTE');
 const title=createMissionElement('h3','',mission.name);
 headingBlock.append(kind,title);
 const year=createMissionElement('p','mission-detail-year',String(mission.year));
 header.append(headingBlock,year);

 const metadata=createMissionElement('dl','mission-detail-meta');
 [
  ['Year',String(mission.year)],
  ['Country',mission.country],
  ['Space agency',mission.agency],
  ['Target',mission.targetLabel],
  [mission.category==='mission'?'Mission type':'Finding type',mission.missionType]
 ].forEach(([label,value])=>{
  const term=createMissionElement('dt','',label);
  const detail=createMissionElement('dd','',value||'Not available in the current data.');
  metadata.append(term,detail);
 });
 if(mission.relatedMission){
  metadata.append(
   createMissionElement('dt','','Related mission'),
   createMissionElement('dd','',mission.relatedMission)
  );
 }

 const story=createMissionElement('div','mission-detail-story');
 [
  ['The story',mission.summary],
  ['Key achievement',mission.achievement],
  [mission.category==='mission'?'Outcome':'Why it matters',mission.outcome]
 ].forEach(([label,value],index)=>{
  const section=createMissionElement('section',`mission-detail-point${index===0?' mission-detail-lead':''}`);
  section.append(createMissionElement('p','eyebrow',label),createMissionElement('p','',value||'Not available in the current data.'));
  story.appendChild(section);
 });
 missionDetail.append(header,metadata,story);
}

function renderMissionTimeline(){
 const agency=missionAgencyFilter.value;
 const target=missionTargetFilter.value;
 const category=missionCategoryFilter.value;
 visibleMissions=missions
  .filter(mission=>(agency==='all'||mission.agencyGroup===agency)&&(target==='all'||mission.target===target)&&(category==='all'||mission.category===category))
  .sort((a,b)=>a.year-b.year||a.name.localeCompare(b.name));
 missionResultCount.textContent=`${visibleMissions.length} ${visibleMissions.length===1?'event':'events'}${visibleMissions.length?` · ${visibleMissions[0].year}–${visibleMissions[visibleMissions.length-1].year}`:''}`;
 missionTimeline.replaceChildren();
 if(!visibleMissions.length){
  const empty=createMissionElement('li','mission-timeline-empty','No events match these filters. Try another combination or reset the filters.');
  missionTimeline.appendChild(empty);
  missionDetail.replaceChildren(createMissionElement('p','mission-detail-empty','Select a different filter combination to continue exploring the archive.'));
  selectedMissionId=null;
  return;
 }
 visibleMissions.forEach((mission,index)=>{
  const entry=createMissionElement('li','mission-timeline-entry');
  const button=createMissionElement('button','mission-event');
  button.type='button';
  button.dataset.missionId=mission.id;
  button.dataset.lane=index%2===0?'above':'below';
  button.setAttribute('aria-pressed','false');
  button.setAttribute('aria-label',`${mission.name}, ${mission.year}, ${mission.category==='mission'?'mission':'discovery'}, ${mission.targetLabel}`);
  const card=createMissionElement('span','mission-event-copy');
  card.append(
   createMissionElement('span','mission-event-year',String(mission.year)),
   createMissionElement('span','mission-event-kind',mission.category==='mission'?'MISSION':'DISCOVERY'),
   createMissionElement('span','mission-event-title',mission.name),
   createMissionElement('span','mission-event-agency',`${mission.agency} · ${mission.targetLabel}`)
  );
  button.append(card,createMissionElement('span','mission-event-marker',''));
  button.addEventListener('click',()=>selectMission(mission.id));
  entry.appendChild(button);
  missionTimeline.appendChild(entry);
 });
 const selected=visibleMissions.find(mission=>mission.id===selectedMissionId)||visibleMissions[0];
 selectMission(selected.id);
}

function selectMission(id){
 const mission=visibleMissions.find(item=>item.id===id);
 if(!mission)return;
 selectedMissionId=id;
 missionTimeline.querySelectorAll('.mission-event').forEach(button=>{
  const selected=button.dataset.missionId===id;
  button.classList.toggle('selected',selected);
  button.setAttribute('aria-pressed',String(selected));
 });
 renderMissionDetail(mission);
}

[missionAgencyFilter,missionTargetFilter,missionCategoryFilter].forEach(filter=>filter.addEventListener('change',renderMissionTimeline));
document.getElementById('missionReset').addEventListener('click',()=>{
 missionAgencyFilter.value='all';
 missionTargetFilter.value='all';
 missionCategoryFilter.value='all';
 renderMissionTimeline();
});
document.getElementById('missionFilters').addEventListener('submit',event=>event.preventDefault());
renderMissionTimeline();
const labPlanetNames=Object.keys(planets).filter(name=>name!=='Sun');
const planetASelect=document.getElementById('planetA');
const planetBSelect=document.getElementById('planetB');
const comparisonTabs=document.getElementById('comparisonTabs');
const comparisonPanel=document.getElementById('comparisonPanel');
const comparisonStatus=document.getElementById('comparisonStatus');
const planetClassNames={rocky:'Rocky planet','gas-giant':'Gas giant','ice-giant':'Ice giant'};
const comparisonCategories={
 overview:{eyebrow:'THE BIG PICTURE',title:'Worlds in perspective',metrics:['diameterKm','gravityMps2','meanTemperatureC'],insights:['diameterKm','gravityMps2','meanTemperatureC']},
 physical:{eyebrow:'PHYSICAL PROPERTIES',title:'The bodies beneath the names',metrics:['diameterKm','gravityMps2','meanTemperatureC'],insights:['diameterKm','gravityMps2','meanTemperatureC']},
 orbit:{eyebrow:'ORBIT & ROTATION',title:'Different paths through space',metrics:['distanceMillionKm','orbitalPeriodDays','rotationPeriodHours'],insights:['distanceMillionKm','orbitalPeriodDays','rotationPeriodHours']},
 atmosphere:{eyebrow:'ATMOSPHERE',title:'Two different envelopes',metrics:[],insights:[]},
 moons:{eyebrow:'NATURAL SATELLITES',title:'Worlds with company',metrics:[],insights:['moonCount']}
};
const comparisonMetrics={
 diameterKm:{label:'Equatorial diameter',higher:'larger',higherLabel:'Larger',lowerLabel:'Smaller',insightTerm:'equatorial diameter',minimumRatio:1.04,format:value=>`${Math.round(value).toLocaleString('en-US')} km`},
 gravityMps2:{label:'Equatorial gravity',higher:'stronger equatorial gravity',higherLabel:'Stronger',lowerLabel:'Weaker',insightTerm:'equatorial gravity',minimumRatio:1.12,format:value=>`${value.toFixed(1)} m/s²`},
 meanTemperatureC:{label:'Mean temperature',higher:'warmer mean temperature',higherLabel:'Warmer',lowerLabel:'Colder',minimumDifference:20,format:value=>`${value<0?'−':''}${Math.abs(value).toLocaleString('en-US')} °C`},
 distanceMillionKm:{label:'Average distance from the Sun',higher:'farther from the Sun',higherLabel:'Farther',lowerLabel:'Closer',insightTerm:'average distance from the Sun',minimumRatio:1.15,format:value=>value>=1000?`${(value/1000).toFixed(2)} billion km`:`${value.toFixed(1)} million km`},
 orbitalPeriodDays:{label:'Orbital period',higher:'longer orbital period',higherLabel:'Longer year',lowerLabel:'Shorter year',insightTerm:'orbital period',minimumRatio:1.12,format:value=>value>=365?`${(value/365.25).toFixed(2)} Earth years`:`${value.toLocaleString('en-US')} days`},
 rotationPeriodHours:{label:'Sidereal rotation period',higher:'longer sidereal rotation period',higherLabel:'Longer rotation',lowerLabel:'Shorter rotation',insightTerm:'sidereal rotation period',minimumRatio:1.15,format:value=>{const period=Math.abs(value);return `${period>=24?`${(period/24).toFixed(1)} days`:`${period.toFixed(1)} hours`}${value<0?' · retrograde':''}`}},
 moonCount:{label:'Known moons',unit:'moons',higher:'more known moons',higherLabel:'More known moons',lowerLabel:'Fewer known moons',minimumRatio:1.1,format:(value,planet)=>planet.facts.Moons||`${value}`}
};
labPlanetNames.forEach((name,index)=>{
 const optionA=document.createElement('option');
 optionA.value=name;
 optionA.textContent=name;
 planetASelect.appendChild(optionA);
 const optionB=optionA.cloneNode(true);
 planetBSelect.appendChild(optionB);
});
planetASelect.value='Earth';
planetBSelect.value='Mars';
let activeComparisonCategory='overview';

function labElement(tag,className,text){
 const element=document.createElement(tag);
 if(className)element.className=className;
 if(text!==undefined)element.textContent=text;
 return element;
}

function getLabPlanets(){
 return {
  aName:planetASelect.value,
  bName:planetBSelect.value,
  a:planets[planetASelect.value],
  b:planets[planetBSelect.value]
 };
}

function planetTypeLabel(planet){
 return planetClassNames[planet.type]||'Classification not available';
}

function comparisonValue(key,planet){
 const value=planet.comparison?.[key];
 return key==='rotationPeriodHours'&&value!==undefined&&value!==null?Math.abs(value):value;
}

function getMetricRelation(key,a,b){
 const metric=comparisonMetrics[key];
 const first=comparisonValue(key,a);
 const second=comparisonValue(key,b);
 if(first===undefined||first===null||second===undefined||second===null)return null;
 if(key==='moonCount'){
  const firstIsMinimum=Boolean(a.comparison.moonCountIsMinimum);
  const secondIsMinimum=Boolean(b.comparison.moonCountIsMinimum);
  if(firstIsMinimum&&secondIsMinimum)return null;
  if(firstIsMinimum&&first<=second)return null;
  if(secondIsMinimum&&second<=first)return null;
 }
 if(first===second)return {same:true,first,second,metric};
 return {same:false,first,second,higher: first>second?'a':'b',metric};
}

function formatPlanetMetric(key,planet){
 const metric=comparisonMetrics[key];
 const value=planet.comparison?.[key];
 if(value===undefined||value===null)return 'Not available in the current data.';
 const formatted=metric.format(value,planet);
 return key==='moonCount'&&planet.comparison.moonCountIsMinimum?`At least ${formatted.replace(/\+$/,'')}`:formatted;
}

function metricStatusLabel(key,relation,side,a,b){
 if(relation){
  if(relation.same)return 'Same value';
  return relation.higher===side?comparisonMetrics[key].higherLabel:comparisonMetrics[key].lowerLabel;
 }
 return key==='moonCount'&&(a.comparison?.moonCountIsMinimum||b.comparison?.moonCountIsMinimum)?'Order uncertain':'Comparison unavailable';
}

function makeMetricRow(key,aName,a,bName,b){
 const metric=comparisonMetrics[key];
 const relation=getMetricRelation(key,a,b);
 const row=labElement('article','lab-metric-row');
 const heading=labElement('h4','lab-metric-label',metric.label);
 const values=labElement('div','lab-metric-values');
 const first=labElement('div','lab-metric-value lab-metric-a');
 first.append(labElement('span','lab-value-world',aName),labElement('strong','',formatPlanetMetric(key,a)),labElement('span','lab-value-status',metricStatusLabel(key,relation,'a',a,b)));
 const second=labElement('div','lab-metric-value lab-metric-b');
 second.append(labElement('span','lab-value-world',bName),labElement('strong','',formatPlanetMetric(key,b)),labElement('span','lab-value-status',metricStatusLabel(key,relation,'b',a,b)));
 values.append(first,second);
 row.append(heading,values);
 const difference=labElement('p','lab-metric-difference');
 const leader=relation?.higher==='a'?aName:bName;
 const other=relation?.higher==='a'?bName:aName;
 const differenceText={
  diameterKm:`${leader} is larger than ${other}.`,
  gravityMps2:`${leader} has stronger equatorial gravity than ${other}.`,
  meanTemperatureC:`${leader} has a warmer mean temperature than ${other}.`,
  distanceMillionKm:`${leader} orbits farther from the Sun than ${other}.`,
  orbitalPeriodDays:`${leader} has a longer orbital period than ${other}.`,
  rotationPeriodHours:`${leader} has a longer sidereal rotation period than ${other}.`,
  moonCount:`${leader} has more known moons than ${other}.`
 };
 difference.textContent=!relation?key==='moonCount'&&(a.comparison?.moonCountIsMinimum||b.comparison?.moonCountIsMinimum)?'The available moon-count lower bounds do not establish which world has more known moons.':'A direct numeric comparison is not available for these values.':relation.same?'These values are the same in this comparison.':differenceText[key];
 row.appendChild(difference);
 return row;
}

function createInsight(key,aName,a,bName,b){
 const relation=getMetricRelation(key,a,b);
 if(!relation){
  if(key==='moonCount'&&a.comparison?.moonCountIsMinimum&&b.comparison?.moonCountIsMinimum)return 'Both published moon counts are lower bounds, so these data do not establish which world has more known moons.';
  return null;
 }
 if(relation.same&&key==='moonCount')return `Both worlds have ${formatPlanetMetric(key,a)} known moons in this data set.`;
 if(relation.same)return null;
 const {first,second,higher,metric}=relation;
 const leader=higher==='a'?aName:bName;
 const other=higher==='a'?bName:aName;
 if(key==='meanTemperatureC'){
  const difference=Math.abs(first-second);
  if(difference<metric.minimumDifference)return null;
  return `${leader} is about ${Math.round(difference)}°C warmer on average than ${other}.`;
 }
 if(key==='moonCount'){
  const count=higher==='a'?first:second;
  const isMinimum=higher==='a'?a.comparison.moonCountIsMinimum:b.comparison.moonCountIsMinimum;
  return `${leader} has ${isMinimum?'at least ':''}${count} known moons in this data set, more than ${other}.`;
 }
 const firstValue=comparisonValue(key,a);
 const secondValue=comparisonValue(key,b);
 const lower=Math.min(firstValue,secondValue);
 const factor=firstValue/secondValue;
 if(lower>0&&Math.max(factor,1/factor)>=metric.minimumRatio){
  const ratio=Math.max(factor,1/factor);
  const qualifier=ratio>=10?Math.round(ratio):ratio.toFixed(1);
  if(key==='distanceMillionKm')return `${leader} is about ${qualifier} times as far from the Sun as ${other}.`;
  if(key==='orbitalPeriodDays')return `${leader}'s orbital period is about ${qualifier} times as long as ${other}'s.`;
  if(key==='rotationPeriodHours')return `${leader}'s sidereal rotation takes about ${qualifier} times as long as ${other}'s.`;
  return `${leader}'s ${metric.insightTerm} is about ${qualifier} times that of ${other}.`;
 }
 return null;
}

function renderComparisonInsights(aName,a,bName,b){
 const container=document.getElementById('comparisonInsights');
 container.replaceChildren();
 if(activeComparisonCategory==='atmosphere'){
  container.appendChild(labElement('p','lab-insight-empty','Atmospheres are described qualitatively here; the available data does not provide a standardized numeric measure for a direct comparison.'));
  return;
 }
 const insights=comparisonCategories[activeComparisonCategory].insights
  .map(key=>createInsight(key,aName,a,bName,b))
  .filter(Boolean);
 if(!insights.length){
  container.appendChild(labElement('p','lab-insight-empty','No standout difference meets the summary threshold for this category.'));
  return;
 }
 insights.forEach((text,index)=>{
  const item=labElement('article','lab-insight');
  item.append(labElement('span','lab-insight-index',String(index+1).padStart(2,'0')),labElement('p','',text));
  container.appendChild(item);
 });
}

function makePlanetDataSourceNote(){
 const note=labElement('p','lab-data-note','Approximate values. Diameter is equatorial; giant-planet gravity and mean temperature are measured at the 1-bar level. Source: ');
 const source=labElement('a','','NASA NSSDCA Planetary Fact Sheet');
 source.href='https://nssdc.gsfc.nasa.gov/planetary/factsheet/';
 source.target='_blank';
 source.rel='noopener noreferrer';
 note.appendChild(source);
 return note;
}

function renderLabCategory(aName,a,bName,b){
 const category=comparisonCategories[activeComparisonCategory];
 const selectedTab=comparisonTabs.querySelector(`[data-category="${activeComparisonCategory}"]`);
 document.getElementById('comparisonCategoryEyebrow').textContent=category.eyebrow;
 document.getElementById('comparisonCategoryTitle').textContent=category.title;
 comparisonPanel.setAttribute('aria-labelledby',selectedTab.id);
 comparisonPanel.replaceChildren();
 if(category.metrics.length){
  category.metrics.forEach(key=>comparisonPanel.appendChild(makeMetricRow(key,aName,a,bName,b)));
  if(activeComparisonCategory==='overview'){
   const detail=labElement('p','lab-data-note','Select a category above to explore more of the measurements. Values are rounded for readability.');
   comparisonPanel.appendChild(detail);
  }
 comparisonPanel.appendChild(makePlanetDataSourceNote());
 return;
 }
 if(activeComparisonCategory==='atmosphere'){
  const comparison=labElement('div','lab-side-by-side');
  [[aName,a],[bName,b]].forEach(([name,planet])=>{
   const side=labElement('article','lab-atmosphere-side');
   side.append(labElement('p','lab-side-kicker',`${name.toUpperCase()} · ${planetTypeLabel(planet)}`));
   side.appendChild(labElement('p','lab-atmosphere-summary',planet.atmosphere?.summary||'Atmosphere information is not available in the current data.'));
   if(planet.atmosphere?.composition?.length){
    const list=labElement('ul','lab-composition-list');
    planet.atmosphere.composition.forEach(component=>list.appendChild(labElement('li','',component)));
    side.appendChild(list);
   }else side.appendChild(labElement('p','lab-data-note','Composition details are not available in the current data.'));
   comparison.appendChild(side);
  });
  comparisonPanel.appendChild(comparison);
  return;
 }
 const comparison=labElement('div','lab-side-by-side');
 [[aName,a],[bName,b]].forEach(([name,planet])=>{
  const side=labElement('article','lab-moon-side');
  side.append(labElement('p','lab-side-kicker',name.toUpperCase()),labElement('p','lab-moon-count',planet.moons?.count||'Not available'));
  side.appendChild(labElement('p','lab-atmosphere-summary',planet.moons?.summary||'Moon information is not available in the current data.'));
  if(planet.moons?.notable?.length){
   const list=labElement('ul','lab-composition-list');
   planet.moons.notable.forEach(moon=>list.appendChild(labElement('li','',moon)));
   side.appendChild(list);
  }
  comparison.appendChild(side);
 });
 comparisonPanel.append(
  makeMetricRow('moonCount',aName,a,bName,b),
  comparison,
  makePlanetDataSourceNote()
 );
}

function renderPlanetComparison(announce=true){
 const {aName,bName,a,b}=getLabPlanets();
 document.getElementById('planetAName').textContent=aName;
 document.getElementById('planetBName').textContent=bName;
 document.getElementById('planetAType').textContent=planetTypeLabel(a);
 document.getElementById('planetBType').textContent=planetTypeLabel(b);
 const visualA=document.getElementById('planetAVisual');
 const visualB=document.getElementById('planetBVisual');
 visualA.className=`lab-planet ${aName.toLowerCase()}-large`;
 visualB.className=`lab-planet ${bName.toLowerCase()}-large`;
 visualA.setAttribute('aria-label',`Illustration of ${aName}`);
 visualB.setAttribute('aria-label',`Illustration of ${bName}`);
 const sizeComparison=document.getElementById('sizeComparison');
 sizeComparison.replaceChildren();
 const firstSize=a.comparison?.diameterKm;
 const secondSize=b.comparison?.diameterKm;
 if(firstSize&&secondSize){
  const largest=Math.max(firstSize,secondSize);
  const sizeFor=value=>Math.max(58,Math.min(154,154*(value/largest)));
  [[aName,a,firstSize],[bName,b,secondSize]].forEach(([name,planet,size])=>{
   const item=labElement('div','lab-size-world');
   const visual=labElement('div',`lab-size-planet ${name.toLowerCase()}-large`);
   visual.style.setProperty('--lab-size',`${sizeFor(size)}px`);
   visual.setAttribute('aria-hidden','true');
   item.append(visual,labElement('strong','',name),labElement('span','',`${size.toLocaleString('en-US')} km`));
   sizeComparison.appendChild(item);
  });
  sizeComparison.setAttribute('aria-label',`Illustrative, not-to-scale diameter comparison: ${aName}, ${Math.round(firstSize).toLocaleString('en-US')} kilometres; ${bName}, ${Math.round(secondSize).toLocaleString('en-US')} kilometres.`);
 }else{
  sizeComparison.appendChild(labElement('p','lab-data-note','Diameter comparison data is not available.'));
 }
 const classContext=document.getElementById('planetClassContext');
 const classesDiffer=a.type!==b.type;
 classContext.hidden=!classesDiffer;
 classContext.textContent=classesDiffer?`${aName} is a ${planetTypeLabel(a).toLowerCase()}, while ${bName} is a ${planetTypeLabel(b).toLowerCase()}. Their interiors and atmospheric structures differ, so some measurements describe different physical environments.`:'Both worlds are classified as '+planetTypeLabel(a).toLowerCase()+'.';
 renderComparisonInsights(aName,a,bName,b);
 renderLabCategory(aName,a,bName,b);
 if(announce)comparisonStatus.textContent=`Comparing ${aName} with ${bName}. ${comparisonCategories[activeComparisonCategory].title}.`;
}

function selectComparisonCategory(category,focus=false){
 if(!comparisonCategories[category])return;
 activeComparisonCategory=category;
 comparisonTabs.querySelectorAll('[role="tab"]').forEach(tab=>{
  const selected=tab.dataset.category===category;
  tab.classList.toggle('active',selected);
  tab.setAttribute('aria-selected',String(selected));
  tab.tabIndex=selected?0:-1;
 });
 renderPlanetComparison();
 if(focus)comparisonTabs.querySelector(`[data-category="${category}"]`).focus();
}

planetASelect.addEventListener('change',()=>renderPlanetComparison());
planetBSelect.addEventListener('change',()=>renderPlanetComparison());
document.getElementById('swapPlanets').addEventListener('click',()=>{
 const previous=planetASelect.value;
 planetASelect.value=planetBSelect.value;
 planetBSelect.value=previous;
 renderPlanetComparison();
});
document.getElementById('resetComparison').addEventListener('click',()=>{
 planetASelect.value='Earth';
 planetBSelect.value='Mars';
 selectComparisonCategory('overview');
});
comparisonTabs.addEventListener('click',event=>{
 const tab=event.target.closest('[role="tab"]');
 if(tab)selectComparisonCategory(tab.dataset.category);
});
comparisonTabs.addEventListener('keydown',event=>{
 const tabs=[...comparisonTabs.querySelectorAll('[role="tab"]')];
 const current=tabs.indexOf(document.activeElement);
 let next=current;
 if(event.key==='ArrowRight')next=(current+1)%tabs.length;
 else if(event.key==='ArrowLeft')next=(current-1+tabs.length)%tabs.length;
 else if(event.key==='Home')next=0;
 else if(event.key==='End')next=tabs.length-1;
 else return;
 event.preventDefault();
 selectComparisonCategory(tabs[next].dataset.category,true);
});
renderPlanetComparison(false);
const quiz=[{q:'Which planet is known as the Red Planet?',a:['Venus','Mars','Mercury','Neptune'],correct:1},{q:'Which planet has the most famous ring system?',a:['Saturn','Earth','Jupiter','Uranus'],correct:0},{q:'What is the largest planet in our Solar System?',a:['Earth','Jupiter','Neptune','Saturn'],correct:1}];let qIndex=0,score=0;function renderQuiz(){const q=quiz[qIndex];document.getElementById('gamePanel').innerHTML=`<p class="eyebrow">QUESTION ${qIndex+1} OF ${quiz.length}</p><div class="quiz-q">${q.q}</div><div class="answer-list">${q.a.map((x,i)=>`<button class="answer" data-i="${i}">${x}</button>`).join('')}</div><div class="game-result" aria-live="polite"></div>`;document.querySelectorAll('.answer').forEach(b=>b.onclick=()=>{const ok=+b.dataset.i===q.correct;if(ok)score++;document.querySelector('.game-result').textContent=ok?'Correct. Nice orbit!':'Not quite — keep exploring.';document.querySelectorAll('.answer').forEach(x=>x.disabled=true);setTimeout(()=>{qIndex++;if(qIndex>=quiz.length){document.getElementById('gamePanel').innerHTML=`<p class="eyebrow">MISSION COMPLETE</p><div class="quiz-q">You scored ${score}/${quiz.length}.</div><button class="primary-btn" id="restartQuiz">Play again →</button>`;document.getElementById('restartQuiz').onclick=()=>{qIndex=0;score=0;renderQuiz()}}else renderQuiz()},900)})}function renderPuzzle(){const order=['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'];const shuffled=[...order].sort(()=>Math.random()-.5);let picked=[];document.getElementById('gamePanel').innerHTML=`<p class="eyebrow">ORBIT PUZZLE</p><div class="quiz-q">Place the planets in order from the Sun.</div><p class="puzzle-info">Tap planets in the sequence you believe is correct.</p><div class="puzzle-list">${shuffled.map(x=>`<button class="puzzle-chip">${x}</button>`).join('')}</div><div class="puzzle-slot">Your orbit sequence will appear here.</div>`;document.querySelectorAll('.puzzle-chip').forEach(btn=>btn.onclick=()=>{if(btn.classList.contains('selected'))return;picked.push(btn.textContent);btn.classList.add('selected');document.querySelector('.puzzle-slot').textContent=picked.join(' → ');if(picked.length===8){const ok=picked.every((x,i)=>x===order[i]);document.querySelector('.puzzle-info').textContent=ok?'Perfect! You know your cosmic neighbourhood.':'Almost — refresh the puzzle tab and try again.'}})}
renderQuiz();document.querySelectorAll('.game-tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.game-tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');b.dataset.game==='quiz'?renderQuiz():renderPuzzle()});
let sound=false,ctx;document.getElementById('soundToggle').onclick=()=>{sound=!sound;if(sound){ctx=new (window.AudioContext||window.webkitAudioContext)();const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=70;g.gain.value=.015;o.connect(g).connect(ctx.destination);o.start();setTimeout(()=>{o.stop();ctx.close()},350);document.getElementById('soundToggle').textContent='◉'}else document.getElementById('soundToggle').textContent='⌁'};
menuToggle.onclick=()=>setMobileMenuOpen(!menu.classList.contains('open'));
