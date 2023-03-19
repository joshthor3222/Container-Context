# Container Context
This is a simple extension that allows you to set your current browsing context for containers. It hijacks the create new tab function, so if a new blank tab is created, it will start in the chosen context.

## Examples
- New tab hotkeys and the new tab button will always open in the chosen container.
- If you are browsing in an existing container, opening links on that page (either with right click -> new tab or middle mouse) will always open in the same container as the tab, if the site doesn't have a defined default container set. 
-- So if you are have your context set for "Work" but you open up "Youtube" which you have set to default to your "Personal" container, Youtube will open in the "Personal" container
-- If you have a "Work" context set, but are watching youtube in a personal tab, middle mouse clicking to open a new youtube video will open in a new personal tab
-- If you have a "Work" context set, but are watching youtube in a personal tab, if you open a blank new tab it will open in the "Work" container

## Limitations
- If you open a link from your bookmarks, it will only open in a container context if you have one set as default. 
