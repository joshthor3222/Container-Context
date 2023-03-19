//var containers = browser.contextualIdentities;
console.log("its working");
//console.log(containers);
var preferredTheme;



var currentContainer = '';



function saveOptions() {
    console.log("hit save options");
    let preferredTheme;
    browser.theme.getCurrent().then((currentTheme) => {
        preferredTheme = currentTheme;
        console.log(currentTheme);

        let storageItem = browser.storage.sync.get('installedTheme');
        storageItem.then((storedItem) => {
            browser.storage.sync.set({
                installedTheme: preferredTheme
            });
        });

    });
}

initialize();

function initialize() {
    saveOptions();
    setInitialStateIcon();
}

function hijackNewTab(tab) {
    var id = tab.id;
    var title = tab.title;
    var url = tab.url;
    //

    browser.tabs.onCreated.removeListener(hijackNewTab);
    console.log("we hit here hijack new tab");
    browser.storage.sync.get('containerid').then((storedItem) => {
        console.log("we hit here get storage");
        console.log(storedItem);
        currentContainer = storedItem.containerid;
        if(currentContainer != '' && url == 'about:newtab') {
            console.log(tab);
            console.log(currentContainer);
            console.log("tab should be updating");
            browser.tabs.remove(id);

            browser.tabs.create({ cookieStoreId: currentContainer });
            //browser.tabs.remove(id);
        }
        browser.tabs.onCreated.addListener(hijackNewTab);
    });
}
browser.tabs.onCreated.addListener(hijackNewTab);

function setInitialStateIcon() {


    browser.storage.sync.get('containerid').then((storedItem) => {
        currentContainer = storedItem.containerid;
        //get container from currentcontainer
        browser.contextualIdentities.get(currentContainer).then((context) => {
            var icon = context.iconUrl;
            //get the filename from the icon url
            var filename = icon.substring(icon.lastIndexOf('/')+1);
            //set the icon to the filename
            var finalicon = "/icons/" + filename;
            browser.browserAction.setIcon({path: finalicon});
        });

    });
}