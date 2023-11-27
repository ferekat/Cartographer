const startButton = document.querySelector("#startBtn")
const rotBtn = document.querySelector("#RotateBtn")
const mirBtn = document.querySelector("#MirrorBtn")
const seasonTable = document.querySelector(".seasonTable")
const seasonTable_tbody = document.querySelector("#seasonTable_tbody")
const gameTable = document.querySelector("#gameTable_tbody")
const gameTable_table = document.querySelector("#gameTable_table")
const challengeTable = document.querySelector(".challenge-container")
const h1 = document.querySelector("h1")
const h2 = document.querySelector("h2")
const gameTable_div=document.querySelector(".gameTable")
const challengeTbody = document.querySelector("#challengeTable_tbody")
const timer = document.querySelector(".timer")
const nextBody = document.querySelector("#elementBody")
const stepsLeftCount = document.querySelector(".stepsLeftCount")
const currentSeason = document.querySelector("#currentSeason")
const spring = document.querySelector("#spring")
const summer = document.querySelector("#summer")
const fall = document.querySelector("#fall")
const winter = document.querySelector("#winter")
const sumResult = document.querySelector("#sumResult")
var stepsLeftCurr = 0
var seasonCount=0
var sumPoints = 0
var springPoints = 0
var summerPoints = 0
var fallPoints = 0
var winterPoints = 0
var indexes = []
var missionPoints=[0,0,0,0]
const missions = 
{
  "basic": [
    {
      "title": "Az erdő széle",
      "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
    },
    {
      "title": "Álmos-völgy",
      "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
    },
    {
      "title": "Krumpliöntözés",
      "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
    },
    {
      "title": "Határvidék",
      "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
    }
  ]
}
function Borderlands(){
    var points = 0
    for(let i = 0; i<11;i++){
        var fullRow = true
        for(let j = 0; j<11;j++){
            if(tableElements[i][j].value==0){
                fullRow = false
                break
            }
        }
        if(fullRow){
            points+=6
        }
    }
    for(let i = 0; i<11;i++){
        var fullColumn = true
        for(let j = 0; j<11;j++){
            if(tableElements[j][i].value==0){
                fullColumn = false
                break
            }
        }
        if(fullColumn){
            points+=6
        }
    }
    return points
}
function EdgeOfTheForest(){
    var points =0
    for(let j = 0; j<11; j+=10){
        for(let i = 0; i<11;i++){
            if(tableElements[j][i].type=='forest' || tableElements[i][j].type=='forest'){
                points++
            }
        }
    }
    return points
}
function WateringPotatoes(){
    var points = 0
    for(let i = 0; i<11;i++){
        for(let j = 0; j<11;j++){
            if(tableElements[i][j].type =='farm'){
                if(i>0 && tableElements[i-1][j].type =='water'){points+=2}
                if(i<10 && tableElements[i+1][j].type =='water'){points+=2}
                if(j>0 && tableElements[i][j-1].type =='water'){points+=2}
                if(j<10 && tableElements[i][j+1].type =='water'){points+=2}
            }
        }
    }
    return points
}
function SleepyValley(){
    var points = 0
    for(let i = 0; i<11;i++){
        var forestCount = 0
        for(let j = 0; j<11;j++){
            if(tableElements[i][j].type == 'forest'){
                forestCount++
            }
        }
        if(forestCount >= 3){
            points+=4
        }
    }
    return points
}
function CorneredMountains(e,f){
    for(let i = e-1; i<=e+1;i++){
        for(let j = f-1; j<=f+1;j++){
            if(tableElements[i][j].value == 0){
                return false
            }
        }
    }
    return true
}
function TreeLine(){
    var treeLength = 0
    var max = 0
    for(let i = 0; i<11;i++){
        for(let j = 0; j<11;j++){
            if(tableElements[j][i].type=='forest'){
                treeLength++
            }
            else{
                if(treeLength*2>max){max = treeLength*2}
                treeLength=0
            }
        }
        treeLength=0
    }
    return max
}
const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]
const tableFields = {
    type: 'unasigned',
    value: 0
}
const seasons = ["Tavasz (AB)","Nyár (BC)","Ősz (CD)","Tél (DA)"]
var tableElements=[]

const images = ['assets/missions_hun/Group 69.png','assets/missions_hun/Group 70.png','assets/missions_hun/Group 74.png','assets/missions_hun/Group 78.png','assets/missions_hun/Group 68.png']
const abc = ["D","C","B","A"]
var next

startButton.addEventListener("click",LoadGame)
rotBtn.addEventListener("click",RotateElement)
mirBtn.addEventListener("click",MirrorElement)
gameTable.addEventListener("click",stepTile)

function EvaluateSpringPoints(){
    var point = 0
    for(let i =0; i<2;i++){
        if(indexes[i]== 'assets/missions_hun/Group 69.png'){
            point = EdgeOfTheForest()
            springPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]== 'assets/missions_hun/Group 70.png'){
            point = WateringPotatoes()
            springPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 74.png'){
            point=SleepyValley()
            springPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 78.png'){
            point=Borderlands()
            springPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 68.png'){
            point=TreeLine()
            springPoints+=point
            missionPoints[i] += point
        }
    }
}
function EvaluateSummerPoints(){
    var point = 0
    for(let i =1; i<3;i++){
        if(indexes[i]== 'assets/missions_hun/Group 69.png'){
            point = EdgeOfTheForest()
            summerPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]== 'assets/missions_hun/Group 70.png'){
            point = WateringPotatoes()
            summerPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 74.png'){
            point=SleepyValley()
            summerPoints+=point
            missionPoints[i] +=point
        }
        if(indexes[i]=='assets/missions_hun/Group 78.png'){
            point=Borderlands()
            summerPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 68.png'){
            point=TreeLine()
            summerPoints+=point
            missionPoints[i] += point
        }
    }
}
function EvaluateFallPoints(){
    var point = 0
    for(let i =2; i<4;i++){
        if(indexes[i]== 'assets/missions_hun/Group 69.png'){
            point=EdgeOfTheForest()
            fallPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]== 'assets/missions_hun/Group 70.png'){
            point=WateringPotatoes()
            fallPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 74.png'){
            point=SleepyValley()
            fallPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 78.png'){
            point = Borderlands()
            fallPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 68.png'){
            point=TreeLine()
            fallPoints+=point
            missionPoints[i] += point
        }
    }
}
function EvaluateWinterPoints(){
    var point = 0
    for(let i =0; i<4;i+=3){
        if(indexes[i]== 'assets/missions_hun/Group 69.png'){
            point = EdgeOfTheForest()
            winterPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]== 'assets/missions_hun/Group 70.png'){
            point = WateringPotatoes()
            winterPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 74.png'){
            point = SleepyValley()
            winterPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 78.png'){
            point=Borderlands()
            winterPoints+=point
            missionPoints[i] += point
        }
        if(indexes[i]=='assets/missions_hun/Group 68.png'){
            point=TreeLine()
            winterPoints+=point
            missionPoints[i] += point
        }
    }
}
function LoadGame(){
    h1.style.display="none";
    h2.style.display="none";
    startButton.style.display="none"
    seasonTable.style.display="inline"
    challengeTable.style.display="inline"
    gameTable_div.style.display="block"
    
    BuildTable()
    CreateGameTable()
    CreatePointsTable()
    CreateResultTable()
    NextElement()
}
function RotateElement(){
    next.rotation++
    if(next.rotation==4){
        next.rotation=0
    }
    while(nextBody.firstChild){
        nextBody.removeChild(nextBody.firstChild)
    }
    var temp = [[],[],[]]
    for (let i = 0; i<3; i++){
        for(let j = 0; j<3;j++){
            temp[i][j] = next.shape[j][2-i]
        }
    }
    next.shape = temp
    for(let i = 0; i<3; i++){
        let row = nextBody.insertRow()
        var elemTypeImg = tileDecider(next)
        for(let j = 0; j<3; j++){
            let cell = row.insertCell()
                if(next.shape[i][j] == 1){
                    elemTypeImg = tileDecider(next)
                    cell.appendChild(elemTypeImg)
                    cell.style.backgroundColor="white"
                }
            cell.style.padding="0"
            cell.style.width="20%"
        }
    }
}
function MirrorElement(){
    while(nextBody.firstChild){
        nextBody.removeChild(nextBody.firstChild)
    }
    var temp = [[],[],[]]
    for (let i = 0; i<3; i++){
        for(let j = 0; j<3;j++){
            temp[i][j] = next.shape[i][2-j]
        }
    }
    next.shape=temp
    for(let i = 0; i<3; i++){
        let row = nextBody.insertRow()
        var elemTypeImg = tileDecider(next)
        for(let j = 0; j<3; j++){
            let cell = row.insertCell()
            if(next.shape[i][j] == 1){
                elemTypeImg = tileDecider(next)
                cell.appendChild(elemTypeImg)
                cell.style.backgroundColor="white"
            }
            cell.style.padding="0"
            cell.style.width="20%"
        }
    }
}
function stepTile(e){
    var xIndex = 0
    var yIndex = 0
    var isTaken = false
    var foundFirst = false
    var cell = e.target.closest('td');
    var rowIndex = cell.parentNode.rowIndex;
    var cellIndex = cell.cellIndex -1;
    const zeroRows = [];
    const zeroColumns = [];
    var width = 0
    var height = 0
    var rowRepeat = 0
    var colRepeat = 0
    findZeroRowsCols(zeroRows,zeroColumns)

    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            if(next.shape[j][i] == 1){
                xIndex=rowIndex-j
                yIndex=cellIndex-i
                foundFirst = true
                break
            }
        }
        if(foundFirst){break}
    }
    if(zeroRows.length>0){
        if(zeroRows[0]==0){
            width = zeroRows.length
        }
        else{
            rowRepeat= zeroRows.length
        }
    }
    if(zeroColumns.length>0){
        if(zeroColumns[0]==0){
            height = zeroColumns.length
        }
        else{
            colRepeat= zeroColumns.length
        }
    }
    for(let i = xIndex+width; i < xIndex+3-rowRepeat;i++){
        for(let j = yIndex+height; j < yIndex+3-colRepeat;j++){
            if(tableElements[i][j].value == 1 && next.shape[i-xIndex][j-yIndex] == 1){
                isTaken = true
            }
            if(isTaken){break}
        }
        if(isTaken){break}
    }
    if(!isTaken){
        for(let i = xIndex+width; i < xIndex+3-rowRepeat;i++){
            for(let j = yIndex+height; j<yIndex+3-colRepeat;j++){
                if(tableElements[i][j].value == 0 && next.shape[i-xIndex][j-yIndex] == 1){
                    tableElements[i][j].value = 1
                    tableElements[i][j].type = next.type
                }
            }
        }
        sumPoints=0
        CreateGameTable()
        UpdateResultTable()
        if(elements.length != 0){NextElement()}
        else{
            sumPoints=0
            if(CorneredMountains(1,1)){sumPoints++}
            if(CorneredMountains(3,8)){sumPoints++}
            if(CorneredMountains(5,3)){sumPoints++}
            if(CorneredMountains(8,9)){sumPoints++}
            if(CorneredMountains(9,5)){sumPoints++}
            CreateGameTable()
            UpdateResultTable()
            stepsLeftCount.innerText="Évszakból hátralévő idő: -"
            currentSeason.innerText="Jelenlegi évszak: -"
            GameOver()
        }
    }
}

function CreateGameTable()
{
    gameTable.innerHTML="";
    for(let i =0; i<11; i++)
    {
        let row = gameTable.insertRow()
        row.insertCell()
        row.style.backgroundColor="white"
        for (let j =0; j <11; j++){
            let cell = row.insertCell()
            imgElement=tileDecider(tableElements[i][j])
            cell.appendChild(imgElement)
            cell.style.backgroundColor="white"
            cell.style.padding="0"
        }
    }
}
function CreateResultTable()
{
    for(let i = 1; i <=2;i++){
        let row = challengeTbody.insertRow()
        row.insertCell()
        for(let j = 1; j <= 2; j++){
            let cell = row.insertCell()
            const chal_img = images[Math.floor(Math.random()*images.length)]
            const index = images.indexOf(chal_img)
            indexes.push(chal_img)
            images.splice(index,1)
            let imgElement = document.createElement('img')
            imgElement.src=chal_img
            imgElement.style.width="100%"
            let pElement = document.createElement('p')
            pElement.innerText=abc.pop()
            pElement.style.margin="0"
            pElement.style.position="absolute"
            pElement.style.color="white"
            pElement.style.fontWeight="bold"
            pElement.style.marginLeft="2%"
            cell.appendChild(pElement)
            cell.appendChild(imgElement)
        }   
    }
}
function CreatePointsTable(){
    seasonTable_tbody.innerHTML=""
        let row = seasonTable_tbody.insertRow()
        let cell = row.insertCell()
        cell.innerText = "Tavasz:\n" +springPoints + " pont"
        cell.style.borderColor= "rgb(10, 95, 10)"
        cell.style.backgroundColor= "rgb(108, 212, 108)"
        
        cell = row.insertCell()
        cell.innerText = "Nyár:\n" +summerPoints+ " pont"
        cell.style.borderColor= "rgb(255, 255, 0)"
        cell.style.backgroundColor= "rgb(255, 255, 142)"
        
        cell = row.insertCell()
        cell.innerText = "Ősz:\n" +fallPoints+ " pont"
        cell.style.borderColor= "rgb(100, 43, 5)"
        cell.style.backgroundColor= "rgb(156, 115, 90)"
        
        cell = row.insertCell()
        cell.innerText = "Tél:\n" +winterPoints+ " pont"
        cell.style.borderColor= "rgb(0, 178, 209)"
        cell.style.backgroundColor= "rgb(101, 222, 243)"

        sumPoints += springPoints+summerPoints+fallPoints+winterPoints
        sumResult.innerHTML="Összesen: "+sumPoints+ " pont"
}
function NextElement(){
    next = elements[Math.floor(Math.random()*elements.length)]
    const index = elements.indexOf(next)
    elements.splice(index,1)
    const nextTime = next.time
    const timerImg = document.createElement('img')
    timerImg.src = 'assets/timer.png'
    timerImg.style.width="7%"
    timerImg.style.marginLeft="2%"
    timer.innerText = nextTime
    timer.appendChild(timerImg)
    timer.style.position="absolute"
    timer.style.fontWeight="normal"
    timer.style.width="98%"
    timer.style.textAlign="right"
    timer.style.marginTop="0"

    for(let i = 0; i<3;i++){
        let row = nextBody.insertRow()
        //row.insertCell()
        var elemTypeImg = tileDecider(next)
        for(let j = 0; j <3; j++){
            let cell = row.insertCell()
            if(next.shape[i][j] == 1){
                cell.appendChild(elemTypeImg)
                cell.style.backgroundColor="white"
                elemTypeImg = tileDecider(next)
            }
            cell.style.padding="0"
            cell.style.width="20%"
        }
    }
}
function tileDecider(e){
    const elemTypeImg = document.createElement('img')
        if(e.type == 'water'){
            elemTypeImg.src='assets/tiles/water_tile.png'
        }
        else if(e.type == 'forest'){
            elemTypeImg.src='assets/tiles/forest_tile.png' 
        }
        else if(e.type == 'town'){
            elemTypeImg.src='assets/tiles/village_tile.png'
        }
        else if(e.type == 'farm'){
            elemTypeImg.src='assets/tiles/plains_tile.png'
        }
        else if(e.type == 'mountain'){
            elemTypeImg.src='assets/tiles/mountain_tile.png'
        }
        else if(e.type == 'unasigned'){
            elemTypeImg.src='assets/tiles/base_tile.png'
        }
        elemTypeImg.style.width="100%"
        elemTypeImg.style.display="block"
        elemTypeImg.style.padding="0"
        elemTypeImg.style.margin="0"
        return elemTypeImg
}
function BuildTable(){
    for(let i = 0; i<11;i++){
        tableElements.push([])
        for(let j = 0; j<11;j++){
            tableElements[i].push({...tableFields})
            if((i==1 && j == 1)||(i==3&& j==8)||(i==5&& j==3)||(i==8&& j==9)||(i==9&& j==5))
            {
                tableElements[i][j].type='mountain'
                tableElements[i][j].value=1
            }
        }
    }
}
function UpdateResultTable(){
    stepsLeftCurr+=next.time
        if(stepsLeftCurr>=(seasonCount+1)*7){
            if(seasonCount ==0){
                EvaluateSpringPoints()
            }
            if(seasonCount==1){
                EvaluateSummerPoints()
            }
            if(seasonCount == 2){
                EvaluateFallPoints()
            }
            if(seasonCount == 3){
                EvaluateWinterPoints()
            }
            seasonCount++
        }
        stepsLeftCount.innerText=""
        stepsLeftCount.innerText="Évszakból hátralévő idő: "+(stepsLeftCurr-(seasonCount*7))+"/7"
        currentSeason.innerText=""
        currentSeason.innerText="Jelenlegi évszak: "+seasons[seasonCount]
        nextBody.innerHTML=""
        CreatePointsTable()

}
function GameOver(){
        alert("Vége a játéknak!\n"+"A küldetésre kapott pont: "+missionPoints[0]+"\n"
        +"B küldetésre kapott pont: "+missionPoints[1]+"\n"
        +"C küldetésre kapott pont: "+missionPoints[2]+"\n"
        +"D küldetésre kapott pont: "+missionPoints[3]+"\n"
        +"A hegyek körbevételéért kapott pont: "+(sumPoints-summerPoints-springPoints-winterPoints-fallPoints))

        nextBody.innerHTML=""
        timer.innerHTML=""
        rotBtn.disabled = true
        mirBtn.disabled = true
}
function findZeroRowsCols(zeroRows, zeroColumns){
    for (let i = 0; i < 3; i++) {
        let isZeroRow = true;
        for (let j = 0; j < 3; j++) {
            if (next.shape[i][j] !== 0) {
                isZeroRow = false;
                break;
            }
        }
        if (isZeroRow) {
            zeroRows.push(i);
        }
    }
    for (let i = 0; i < 3; i++) {
        let isZeroColumn = true;
        for (let j = 0; j < 3; j++) {
            if (next.shape[j][i] !== 0) {
                isZeroColumn = false;
                break;
            }
        }
        if (isZeroColumn) {
            zeroColumns.push(i);
        }
    }
}