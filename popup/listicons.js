var containerData;
var containerid;

function onGot(contexts) {
    containerData = contexts;
    //for each container, get the icon and add it as a div in .outer-wrapper
    for (const context of contexts) {

        //console.log(context);
        //console.log(`Name: ${context.name}`);


        var icon = document.createElement("div", this);
        //set class to icon
        icon.className = "icon";
        //make an id from context.name, but make it all lowercase with no spaces
        var itemid = containerNameFromId(context.name);
        icon.id = itemid;
        //icon.onclick = selectIcon(context.name);

        //create div with a background image of the icon url and a size of 16x16
        var div = document.createElement("div");
        div.style.mask = "url(" + context.iconUrl + ")";
        div.style.maskSize = "16px 16px";
        div.className = "icon-div";
        div.style.maskRepeat = "no-repeat";
        div.style.maskPosition = "center";
        div.style.width = "16px";
        div.style.height = "16px";
        div.style.margin = "auto";
        div.style.marginTop = "5px";
        div.style.padding = "5px";
        div.style.marginBottom = "5px";
        div.style.border = "1px solid #000000";
        div.style.cursor = "pointer";
        div.style.position = "relative";
        div.style.display = "block";
        div.style.backgroundColor = context.colorCode;

        icon.appendChild(div);

        document.querySelector(".outer-wrapper").appendChild(icon);

        document.getElementById(itemid).addEventListener("click", function() {
            selectIcon(context.name);

        });


    }
    document.getElementById('defaultContainer').addEventListener("click", function() {
        selectIcon('');

    });
}


function onError(error) {
    console.error(error);
}

function selectIcon(name) {
    console.log(containerData);
    let set = false;
    //console.log("select icon hit for " + name);
    //search containerData for the name
    for (const context of containerData) {
        if (context.name == name) {
            console.log(context);
            //set the containers icon as the
            var icon = context.iconUrl;
            //get the filename from the icon url
            var filename = icon.substring(icon.lastIndexOf('/')+1);
            //set the icon to the filename
            var finalicon = "/icons/" + filename;
            console.log(finalicon);
            currentContainer = context.name;
            containerid = context.cookieStoreId;

            browser.storage.sync.set({
                containerid: containerid
            });


            browser.browserAction.setIcon({path: finalicon});
            set = true;

            //now we need to change the theme frame to match the icon
            //get the color of the icon
            var color = context.colorCode;
            //setTheme(color);

        }
    }
    if(set == false) {
        var finalicon = "/icons/cancel.svg";
        currentContainer = '';
        containerid = '';

        browser.storage.sync.set({
            containerid: ''
        });
        browser.browserAction.setIcon({path: finalicon});
        //setTheme();
    }
    console.log(name);
}

browser.contextualIdentities.query({}).then(onGot, onError);
setPopupTheme();
//console.log(preferredTheme);

function setPopupTheme() {
    let storageItem = browser.storage.sync.get('installedTheme');
    storageItem.then((storedItem) => {
        let installedtheme = storedItem.installedTheme;
        let framecolor = getColorString(installedtheme.colors.frame);
        let bookmarktext = getColorString(installedtheme.colors.bookmark_text);
        let buttonbackgroundactive = getColorString(installedtheme.colors.button_background_active);
        let buttonbackgroundhover = getColorString(installedtheme.colors.button_background_hover);


        //create style element
        var style = document.createElement("style");
        //set body background in our style element to be framecolor
        style.innerHTML = "body { background-color: " + buttonbackgroundactive + " !important; }";
        //set icon img fill to be bookmarktext
        style.innerHTML += ".icon-div { background-color: " + bookmarktext + "; }";
        //set icon hover to be buttonbackgroundhover
        style.innerHTML += ".icon:hover { background-color: " + buttonbackgroundhover + " !important; }";


        //add style element to the head
        document.head.appendChild(style);
    });
    //console.log(storageItem);
}

function getColorString(color) {
    let finalcolor = color;

    if (Array.isArray(color)) {
        //if frame has 3 numbers, create an rgb string from it
        if (color.length == 3) {
            var rgb = color.join(",");
            var rgbString = "rgb(" + rgb + ")";
            finalcolor = rgbString;

        }
        //if frame has 4 numbers, create an rgba string from it
        else if (color.length == 4) {
            var rgb = color.slice(0,3).join(",");
            var rgbString = "rgba(" + rgb + "," + color[3] + ")";
            finalcolor = rgbString;
        }
    }

    return finalcolor;
}

function containerNameFromId(containername) {
    var containerid = containername.toLowerCase().replace(/\s/g, '');
    return containerid;
}
