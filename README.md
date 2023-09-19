# CASA - Connecting local trade with Homeowners and Tenants for Extreme Weather Preparedness

## 1. Project Description
Our team BBY31 is developing an app to help homeowners and tenants prepare their home for extreme weather by notifying them of recommended actions and suggesting local services to fulfill their home needs.

## 2. Names of Contributors
List team members and/or short bio's here...  
* Felix Wei, BCIT CST student term 1
* Eddie Xu, BCIT CST student term 1
* Savio Dsouza, BCIT CST student term 1
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)

## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
* Visit https://comp1800-bby31.web.app/
* Register for a new account or login
* Go to landing page and explore!

## 5. Known Bugs and Limitations
Here are some known bugs:
* In alerts.js, all weather-trigger-if-statements currently also have an OR TRUE in their condition just to show them regardless of actual weather conditions for the purposes of testing and demo 
* ...
* ...

## 6. Features for Future
What we'd like to build in the future:
* Current weather API only checks 5 days forecast using Open Weather API. They have a 16day forecast I would have liked to use but you need to buy a subscription.
* Current weather API reads only for Vancouver because of API free account limitations. We would like to make it so the user can set their own location from a variety of cities worldwide.
* Add more filtering options for tradespersons.
* Implement a review system for tradespersons where users can leave ratings/reviews for a tradesperson. 
	
## 7. Contents of Folder
Content of the project folder:
*structured this way because we originally setup the project to run on node express, and while we have removed node express we have kept the structure/pathing

```
 Top level of project folder: 
├── .gitignore              		# Git ignore file
├── .git folder                		# Folder for git repo
├── Tips Masterlist (Firebase).docx     # Contains all the tips that go into the firebase Tip collection   
└── README.md

 Main CASA folder:  
├── .gitignore              		# Git ignore file
├── index.html  			# landing HTML file, this is what users see when you come to url  
└── *firebase hosting files

It has the following subfolders and files:
├── app/html/                	 # contains all html pages 
	alerts.html			# landing page, shows weather alerts
	login.html			# login page
	navBottom.html			# skeleton for all pages
	navTop.html			# skeleton for all pages
	profile.html			# user profile page
	reset.html			# reset password page
	savelist.html			# user's saved to do (tips) page
	signup.html			# register page
	template.html			# template page not displayed to user, for dev purposes
	terms.html			# terms and conditions page 
	tips.html			# tips page
	tradeReg.html			# tradesperson registration information page
	TradeSelect.html		# hire a tradesperson page
    	/alerts/                  # contains each alert .html that is called and populated based on weatherAPI trigger
		alertFreeze.html 	# for freezing weather
		alertHeat.html   	# for heat domes
		alertNone.html   	# shows when no weather triggers are activie
		alertRain.html		# for heavy rainfall
		alertWind.html		# for strong winds
├── public/js/              	  # Folder for scripts
    	alerts.js			# shows weather alerts, reads weatherAPI, replaces alerts placeholders
	firebaseAPI_TEAM31.js		# links firebase
	login.js			# login page
	navtop_img.js			# makes user image display across pages
	profile.js			# user profile page
	rating.js			# for ratings system, currently defunct
	reset.js			# reset password page
	savelist.js			# displays from user's firebase of saved/bookmarked tips
	signup.js			# register page
	skeleton.js			# used to make navbars across pages
	tips.js				# displays relavant tip from firebase for the alert clicked
	trade.js 			# hire a tradesperson page
	tradeReg.js			# tradesperson registration information page
	weatherForecast.js		# used to read weatherAPI and display forecast on alerts.html 
├── pulbic/css/           	  # Folder for styles
    styles.css    	    		# contains all css used 
├── public/img/           	  # Folder for images
        /Navbar/		        # contains images used for navbar icons, sourced from https://icons.getbootstrap.com/
	/Tips/				# contains images paired with tips to give visual illustration, various sources from google images
		AirConditioning.jpg 		# src: https://www.wikihow.com/Install-a-Split-System-Air-Conditioner
		BlackoutBlinds.jpg		# src: https://www.selectblindscanada.ca/roller-shades/super-value-vinyl-blackout-roller-shades.html
		DisconnectHose.jpg		# src: https://www.thespruce.com/winterize-outside-faucets-2718702
		Grade.png			# src: https://www.handymanusa.com/articles/drybasement.html
		Gutters.jpg			# src: https://www.gutterhelmet.com/blog/3-obvious-signs-that-your-gutters-need-cleaning/
		Insulate.jpg			# src: https://www.reenergizeco.com/blog/seal-attic-air-leaks/
		Pipes.jpg			# src: https://www.homedepot.com/c/ah/how-to-prevent-pipes-from-freezing/9ba683603be9fa5395fab905760afb9
		RainGarden.png			# src: https://canadablooms.com/what-is-a-rain-garden/
		ReflectiveRoof.png		# src: https://aboveall.net/roofing/metal-roofs/
		ReinforceGaradeDoor.jpg		# src: https://raynor.com/hurricane-ready-garage-doors/
		ReinforceWalls.jpg		# src: https://www.homedepot.com/p/Simpson-Strong-Tie-9-x-1-1-2-in-1-4-Hex-Drive-Strong-Drive-SD-Connector-Screw-100-Pack-SD9112R100/202071152
		ReinforceWindows.jpg		# src: https://www.pella.com/performance/impact-resistance/understanding-hurricane-windows/
		SealGaps.jpg			# src: https://www.homeserve.com/en-us/blog/how-to/install-prehung-door/
		SecureFurniture.jpg		# src: https://www.wikihow.com/Secure-Patio-Furniture-from-Wind
		Shade.jpg			# src: https://www.homedepot.com/c/ai/deck-shade-ideas/9ba683603be9fa5395fab901d7af4385
		Shingle.jpg			# src: https://www.wheatlandroofing.com/services/roof-maintenance
		SpoutAway.jpg			# src: https://homeinspectiongeeks.com/keeping-your-gutter-system-in-order-can-save-you-big-money/
		TrimTrees.jpg			# src: https://www.wikihow.com/Cut-a-Limb-from-a-Tree
		WindowLeak.jpg			# src: https://www.ecolinewindows.ca/leaking-windows/
		WindowWellCover.png		# src: https://windowwellcovers.com/shop/covers/bubbles/68-x-24-bubble-window-well-cover/
	/Weather/			# contains images paired with weather alerts to give visual illustration, various sources from google images
		Goodweather1.jpg		# src: https://watv.org/faith_life/good-weather/
		HeatWave1.jpg			# src: https://geographical.co.uk/climate-change/geoengineering-to-block-out-the-sun
		Rain1.jpg			# src: https://kitchener.ctvnews.ca/up-to-50-mm-of-rain-possible-by-tuesday-in-waterloo-wellington-1.5934312
		Snowfall1.jpg			# src: https://www.istockphoto.com/photo/pedestrians-crossing-the-street-on-a-snowy-day-gm535513443-57491002
		Wind1.png			# src: https://vancouver.citynews.ca/2023/01/05/metro-vancouver-wind-storm/
```


