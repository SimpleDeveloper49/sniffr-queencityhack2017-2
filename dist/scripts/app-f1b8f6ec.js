!function(){"use strict";angular.module("app",["ngMaterial","firebase"])}(),function(){"use strict";function t(t){var e=[{name:"Dogs",icon:"pets",sref:".dogs"},{name:"Foster",icon:"person",sref:".foster"}];return{loadAllItems:function(){return t.when(e)}}}angular.module("app").service("navService",["$q",t])}(),function(){"use strict";function t(t,e,a,i){function n(){a.authorize()}function d(){a.parseHash(function(a,n){if(n&&n.idToken){console.log(n),e.get("/api/users").then(function(t){for(var a=0;a<t.data.length;a++){var i=!1;n.idTokenPayload.sub===t.data[a].auth0Key&&(i=!0)}i||e.post("/api/users",{firstName:n.idTokenPayload.given_name,lastName:n.idTokenPayload.family_name,auth0Key:n.idTokenPayload.sub,userTypeId:4})}),m(n);{n.idTokenPayload}t.go("home.dogs")}else a&&(i(function(){t.go("home.dogs")}),console.log(a),alert("Error: "+a.error+". Check the console for further details."))})}function l(t){var e=localStorage.getItem("access_token");if(!e)throw new Error("Access token must exist to fetch profile");a.client.userInfo(e,function(e,a){a&&o(a),t(e,a)})}function o(t){u=t}function s(){return u}function m(t){var e=JSON.stringify(1e3*t.expiresIn+(new Date).getTime());localStorage.setItem("access_token",t.accessToken),localStorage.setItem("id_token",t.idToken),localStorage.setItem("expires_at",e)}function r(){localStorage.removeItem("access_token"),localStorage.removeItem("id_token"),localStorage.removeItem("expires_at"),t.go("home.dogs")}function c(){var t=JSON.parse(localStorage.getItem("expires_at"));return(new Date).getTime()<t}var u;return{login:n,getProfile:l,getCachedProfile:s,handleAuthentication:d,logout:r,isAuthenticated:c}}angular.module("app").service("authService",t),t.$inject=["$state","$http","angularAuth0","$timeout","$firebaseArray"]}(),function(){function t(t,e,a){var i=this;i.menuItems=[],i.title=e.current.data.title,i.auth=a,t.loadAllItems().then(function(t){i.menuItems=[].concat(t)})}angular.module("app").controller("MainController",["navService","$state","authService",t])}(),function(){function t(t){var e=this;e.users=[],e.selectedUser=null,e.selectedUserDogs=[],t.get("/api/users").then(function(t){for(var a=t.data,i=0;i<a.length;i++)1==a[i].userTypeId&&e.users.push(a[i])}),e.selectFoster=function(a){e.selectedUserDogs=[],t.get("/api/dogs").then(function(t){for(var i=t.data,n=0;n<i.length;n++)i[n].careGiverId==a&&e.selectedUserDogs.push(i[n])});for(var i=0;i<e.users.length;i++)e.users[i].userId==a&&(e.selectedUser=e.users[i],t.get("/api/houses").then(function(t){for(var a=t.data,i=0;i<a.length;i++)a[i].houseId==e.selectedUser.houseId&&(e.property=a[i])}),t.get("/api/addresses").then(function(t){for(var a=t.data,i=0;i<a.length;i++)a[i].addressId==e.selectedUser.addressId&&(e.address=a[i])}),t.get("/api/phones").then(function(t){for(var a=t.data,i=0;i<a.length;i++)a[i].phoneId==e.selectedUser.phoneId&&(e.phone=a[i])}))}}angular.module("app").controller("FosterController",["$http",t]).filter("dogTypeFilter",function(){return function(t){switch(t){case 1:return"German Shepherd";case 2:return"Rottweiler";case 3:return"Bulldog"}}}).filter("houseTypeFilter",function(){return function(t){switch(t){case 1:return"Townhouse";case 2:return"Bungalow";case 3:return"Farm"}}})}(),function(){function t(t,e,a){var i=this;i.dogs=[],i.selectedDog=null,i.dogChat=null,i.newDog=null,i.users=[],i.newVaccination=null,i.newTraining=null,i.newMedicals=null,i.medicalInformation=[],i.fitness=[],i.vaccination=[],i.medicals=[],i.addVaccination=function(){var t={dogId:i.selectedDog.dogId,medicalInfoTypeId:1,info:i.newVaccination};i.vaccination.push(t),a.post("/api/medical_infos",t).then(function(){i.newVaccination=null})},i.addTraining=function(){var t={dogId:i.selectedDog.dogId,medicalInfoTypeId:3,info:i.newTraining};i.fitness.push(t),a.post("/api/medical_infos",t).then(function(){i.newTraining=null})},i.addMedicals=function(){var t={dogId:i.selectedDog.dogId,medicalInfoTypeId:2,info:i.newMedicals};i.medicals.push(t),a.post("/api/medical_infos",t).then(function(){i.newMedicals=null})},a.get("/api/users").then(function(t){i.users=t.data}),i.saveNewDog=function(){a.post("/api/dogs",i.newDog).then(function(){i.newDog=null,i.isNewDog=!1,a.get("/api/dogs").then(function(t){i.dogs=[].concat(t.data)})})},i.updateDog=function(){a.put("/api/dogs/"+i.selectedDog.dogId,i.selectedDog).then(function(){i.selectedDog=null,i.fitness=[],i.vaccination=[],i.medicals=[],a.get("/api/dogs").then(function(t){i.dogs=[].concat(t.data)})},function(t){console.log("ERROR"),console.log(t)})},i.selectDog=function(t){for(var e=0;e<i.dogs.length;e++)i.dogs[e].dogId==t&&(i.selectedDog=i.dogs[e],a.get("/api/medical_infos").then(function(e){for(var a=e.data,n=0;n<a.length;n++)if(a[n].dogId==t)switch(a[n].medicalInfoTypeId){case 1:i.vaccination.push(a[n]);break;case 2:i.medicals.push(a[n]);break;case 3:i.fitness.push(a[n])}i.medicalInformation=a}))},i.chatDog=function(a){function n(){var e=firebase.database().ref().child("users").child(a).child("conversations").child("llt0OfJsr1PgASaJNHbJ8DrkOH03");return t(e)}for(var d=0;d<i.dogs.length;d++)i.dogs[d].dogId==a&&(i.dogChat=i.dogs[d],i.selectedDog=null);i.dogChat&&n().$loaded().then(function(t){var a=firebase.database().ref().child("conversations").child(t.location);i.messages=e(a)})},i.addNewDog=function(){i.isNewDog=!0},i.isImage=function(t){var e=t.substring(0,4);return"http"===e},i.newMessage="",i.dogTypes=[{id:1,description:"German Shepherd"},{id:2,description:"Rottweiler"},{id:3,description:"Bulldog"}],i.adoptionStatuses=[{id:1,description:"Pending"},{id:2,description:"Quarantine"},{id:3,description:"Ready for Adoption"},{id:4,description:"Adopted"}],i.sendMessage=function(){var t=Math.floor(Date.now()/1e3);i.messages.$add({content:i.newMessage,fromID:"-KvDnWsYX02UNsDubi4Y",isRead:!1,timestamp:t,toID:"pTMxPeFGGyb2LpEpNFZatdbJFY12",type:"text"}),i.newMessage=""},a.get("/api/dogs").then(function(t){i.dogs=[].concat(t.data)})}angular.module("app").filter("dogTypeFilter",function(){return function(t){switch(t){case 1:return"German Shepherd";case 2:return"Rottweiler";case 3:return"Bulldog"}}}).filter("adoptionStatusFilter",function(){return function(t){switch(t){case 1:return"Pending";case 2:return"Quarantine";case 3:return"Ready for Adoption";case 4:return"Adopted"}}}).controller("DogsController",["$firebaseObject","$firebaseArray","$http",t]).filter("userFilter",function(){return function(t,e){if(e)for(var a=0;a<e.length;a++)if(e[a].userId===t)return e[a].firstName+" "+e[a].lastName}})}(),function(){"use strict";function t(){}angular.module("app").controller("CallbackController",t)}(),angular.module("angularMaterialAdmin",["ngAnimate","ngCookies","ngSanitize","ui.router","ngMaterial","nvd3","app","md.data.table","auth0.auth0"]).config(["$stateProvider","$urlRouterProvider","$mdThemingProvider","$mdIconProvider","angularAuth0Provider",function(t,e,a,i,n){t.state("home",{url:"",templateUrl:"app/views/main.html",controller:"MainController",controllerAs:"vm","abstract":!0}).state("home.foster",{url:"/foster",templateUrl:"app/views/foster.html",controller:"FosterController",controllerAs:"vm",data:{title:"Foster"}}).state("home.callback",{url:"/callback",controller:"CallbackController",templateUrl:"app/views/callback.html",controllerAs:"vm"}).state("home.dogs",{url:"/dogs",controller:"DogsController",controllerAs:"vm",templateUrl:"app/views/dogs.html",data:{title:"Dogs"}}),n.init({clientID:AUTH0_CLIENT_ID,domain:AUTH0_DOMAIN,responseType:"token id_token",audience:"https://"+AUTH0_DOMAIN+"/userinfo",redirectUri:AUTH0_CALLBACK_URL,scope:"openid profile"}),e.otherwise("/dogs"),a.theme("default").primaryPalette("grey",{"default":"600"}).accentPalette("teal",{"default":"500"}).warnPalette("defaultPrimary"),a.theme("dark","default").primaryPalette("defaultPrimary").dark(),a.theme("grey","default").primaryPalette("grey"),a.theme("custom","default").primaryPalette("defaultPrimary",{"hue-1":"50"}),a.definePalette("defaultPrimary",{50:"#FFFFFF",100:"rgb(255, 198, 197)",200:"#E75753",300:"#E75753",400:"#E75753",500:"#E75753",600:"#E75753",700:"#E75753",800:"#E75753",900:"#E75753",A100:"#E75753",A200:"#E75753",A400:"#E75753",A700:"#E75753"}),i.icon("user","assets/images/user.svg",64)}]),function(){"use strict";function t(t){t.handleAuthentication()}angular.module("app").run(t),t.$inject=["authService"]}(),angular.module("angularMaterialAdmin").run(["$templateCache",function(t){t.put("app/views/callback.html",'<div class="loading"><img src="assets/loading.svg" alt="loading"></div>'),t.put("app/views/dogs.html",'<div class="table-responsive-vertical md-whiteframe-z1"><table id="table" class="table table-hover table-bordered" ng-if="!vm.selectedDog && !vm.dogChat && !vm.isNewDog"><thead><tr><th></th><th>Dog Name</th><th>Dog Type</th><th>Foster</th><th>Adoption Status</th><th></th></tr></thead><tbody><tr ng-repeat="data in vm.dogs track by $index"><td style="text-align: center;"><md-list-item><img ng-src="{{data.profileUrl}}" class="md-avatar"></md-list-item></td><td style="vertical-align: middle!important;" data-title="Dog Name">{{data.name}}</td><td style="vertical-align: middle!important;" data-title="Dog Type">{{data.dogTypeId | dogTypeFilter}}</td><td style="vertical-align: middle!important;" data-title="Foster">{{data.careGiverId | userFilter : vm.users}}</td><td style="vertical-align: middle!important;" data-title="Adoption Status">{{data.adoptionStatus | adoptionStatusFilter}}</td><td style="vertical-align: middle!important; text-align: right;"><md-button ng-click="vm.selectDog(data.dogId)" class="md-raised md-accent">View</md-button></td></tr></tbody><tfoot><tr><td colspan="6" style="text-align: right"><md-button ng-click="vm.addNewDog()" class="md-raised md-accent">Add Dog</md-button></td></tr></tfoot></table><div ng-if="vm.selectedDog"><md-content md-theme="dark" class="md-padding"><div layout="" layout-sm="column"><md-input-container flex="20"><img style="border-radius: 50%; width: 125px; height: 125px;" ng-src="{{vm.selectedDog.profileUrl}}"></md-input-container><div flex="80"><div layout="" layout-sm="column"><md-input-container flex=""><label>Dog Name</label> <input ng-model="vm.selectedDog.name"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Dog Type</label><md-select ng-model="vm.selectedDog.dogTypeId"><md-option ng-value="dogType.id" ng-repeat="dogType in vm.dogTypes">{{ dogType.description }}</md-option></md-select></md-input-container><md-input-container flex=""><label>Adoption Status</label><md-select ng-model="vm.selectedDog.adoptionStatus"><md-option ng-value="adoptionStatus.id" ng-repeat="adoptionStatus in vm.adoptionStatuses">{{ adoptionStatus.description }}</md-option></md-select></md-input-container></div></div></div></md-content><md-content class="md-padding"><form name="userForm"><div layout="" layout-sm="column"><md-input-container flex=""><label>Height</label> <input ng-model="vm.selectedDog.height"></md-input-container><md-input-container flex=""><label>Age</label> <input ng-model="vm.selectedDog.age"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Weight</label> <input ng-model="vm.selectedDog.weight"></md-input-container><md-input-container flex=""><label>Eligble Foster Parents</label><md-select ng-model="vm.selectedDog.careGiverId"><md-option ng-value="user.userId" ng-repeat="user in vm.users">{{ user.firstName + " " + user.lastName }}</md-option></md-select></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Profile Url</label> <input ng-model="vm.selectedDog.profileUrl"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>About</label> <textarea ng-model="vm.selectedDog.about" columns="1" md-maxlength="140"></textarea></md-input-container></div><div layout="" layout-sm="column"><div flex=""><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Vaccination</span></h2></md-toolbar><md-content class="md-padding"><div layout="" layout-sm="column"><md-list flex=""><md-list-item class="md-2-line" ng-repeat="item in vm.vaccination"><div class="md-tile-content md-avatar"><i class="material-icons md-36">add_circle_outline</i></div><div class="md-list-item-text" layout="column"><h3>{{item.info}}</h3><p>{{item.created_at | date:\'yyyy-MM-dd\'}}</p></div></md-list-item><md-list-item><div class="md-list-item-text"><md-input-container flex=""><label>New Vaccination</label> <input ng-model="vm.newVaccination"></md-input-container><md-button class="md-raised md-accent" ng-click="vm.addVaccination()"><i class="material-icons md-36">add</i></md-button></div></md-list-item></md-list></div></md-content></div><div flex=""><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Medicals</span></h2></md-toolbar><md-content class="md-padding"><div layout="" layout-sm="column"><md-list flex=""><md-list-item class="md-2-line" ng-repeat="item in vm.medicals"><div class="md-tile-content md-avatar"><i class="material-icons md-36">favorite</i></div><div class="md-list-item-text" layout="column"><h3>{{item.info}}</h3><p>{{item.created_at | date:\'yyyy-MM-dd\'}}</p></div></md-list-item><md-list-item><div class="md-list-item-text"><md-input-container flex=""><label>New Medicals</label> <input ng-model="vm.newMedicals"></md-input-container><md-button class="md-raised md-accent" ng-click="vm.addMedicals()"><i class="material-icons md-36">add</i></md-button></div></md-list-item></md-list></div></md-content></div><div flex=""><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Training</span></h2></md-toolbar><md-content class="md-padding"><div layout="" layout-sm="column"><md-list flex=""><md-list-item class="md-2-line" ng-repeat="item in vm.fitness"><div class="md-tile-content md-avatar"><i class="material-icons md-36">fitness_center</i></div><div class="md-list-item-text" layout="column"><h3>{{item.info}}</h3><p>{{item.created_at | date:\'yyyy-MM-dd\'}}</p></div></md-list-item><md-list-item><div class="md-list-item-text"><md-input-container flex=""><label>New Training</label> <input ng-model="vm.newTraining"></md-input-container><md-button class="md-raised md-accent" ng-click="vm.addTraining()"><i class="material-icons md-36">add</i></md-button></div></md-list-item></md-list></div></md-content></div></div><div layout="" layout-sm="column"><md-input-container style="text-align: right;" flex=""><md-button ng-click="vm.chatDog(vm.selectedDog.dogId)" class="md-raised md-accent">Chat</md-button><md-button ng-click="vm.updateDog()" class="md-raised md-accent">Update</md-button></md-input-container></div></form></md-content></div><div ng-if="vm.isNewDog"><md-content md-theme="dark" class="md-padding"><div layout="" layout-sm="column"><md-input-container flex="20"><img style="border-radius: 50%; width: 125px; height: 125px;" ng-src="{{vm.newDog.profileUrl}}"></md-input-container><div flex="80"><div layout="" layout-sm="column"><md-input-container flex=""><label>Dog Name</label> <input ng-model="vm.newDog.name"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Dog Type</label><md-select ng-model="vm.newDog.dogTypeId"><md-option ng-value="dogType.id" ng-repeat="dogType in vm.dogTypes">{{ dogType.description }}</md-option></md-select></md-input-container><md-input-container flex=""><label>Adoption Status</label><md-select ng-model="vm.newDog.adoptionStatus"><md-option ng-value="adoptionStatus.id" ng-repeat="adoptionStatus in vm.adoptionStatuses">{{ adoptionStatus.description }}</md-option></md-select></md-input-container></div></div></div></md-content><md-content class="md-padding"><form name="userForm"><div layout="" layout-sm="column"><md-input-container flex=""><label>Height</label> <input ng-model="vm.newDog.height"></md-input-container><md-input-container flex=""><label>Age</label> <input ng-model="vm.newDog.age"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Weight</label> <input ng-model="vm.newDog.weight"></md-input-container><md-input-container flex=""><label>Eligble Foster Parents</label><md-select ng-model="vm.newDog.careGiverId"><md-option ng-value="user.userId" ng-repeat="user in vm.users">{{ user.firstName + " " + user.lastName }}</md-option></md-select></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Profile Url</label> <input ng-model="vm.newDog.profileUrl"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>About</label> <textarea ng-model="vm.newDog.about" columns="1" md-maxlength="140"></textarea></md-input-container></div><div layout="" layout-sm="column"><md-input-container style="text-align: right;" flex=""><md-button ng-click="vm.saveNewDog()" class="md-raised md-accent">Save</md-button></md-input-container></div></form></md-content></div><div ng-if="vm.dogChat"><div layout="" layout-sm="column"><md-input-container flex="" style="background-color: white;"><form class="chat"><span></span><div class="messages" id="collabthread"><div class="message" ng-repeat="m in vm.messages"><div ng-class="(m.fromID!=\'llt0OfJsr1PgASaJNHbJ8DrkOH03\' ) ? \'in\': \'out\'"><span ng-show="false" class="initial">{{m.fromID }}</span><p ng-if="!vm.isImage(m.content)">{{m.content}}</p><img ng-if="vm.isImage(m.content)" src="{{m.content}}" width="300px" height="300px"><date ng-if="m.fromID!=\'llt0OfJsr1PgASaJNHbJ8DrkOH03\'"><b>Me</b> {{m.timestamp | date:"MM/dd \'at\' h:mma "}}</date><date ng-if="m.fromID==\'llt0OfJsr1PgASaJNHbJ8DrkOH03\'"><b>Landon</b> {{m.timestamp | date:"MM/dd \'at\' h:mma "}}</date></div></div></div></form></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Message</label> <textarea ng-model="vm.newMessage" columns="1" md-maxlength="140"></textarea></md-input-container><md-button ng-click="vm.sendMessage()" class="md-raised md-accent">Send</md-button></div></div></div>'),t.put("app/views/foster.html",'<div class="table-responsive-vertical md-whiteframe-z1"><table id="table" class="table table-hover table-bordered" ng-if="!vm.selectedUser"><thead><tr><th></th><th>First Name</th><th>Last Name</th><th>Standing</th><th></th></tr></thead><tbody><tr ng-repeat="data in vm.users track by $index"><td style="text-align: center;"><md-list-item><img src="https://getokular.com/img/user_1.jpg" class="md-avatar"></md-list-item></td><td style="vertical-align: middle!important;" data-title="First Name">{{data.firstName}}</td><td style="vertical-align: middle!important;" data-title="Last Type">{{data.lastName}}</td><td style="vertical-align: middle!important;" data-title="Standing">Approved</td><td style="vertical-align: middle!important; text-align: right;"><md-button ng-click="vm.selectFoster(data.userId)" class="md-raised md-accent">View</md-button></td></tr></tbody></table><div ng-if="vm.selectedUser"><md-content md-theme="dark" class="md-padding"><div layout="" layout-sm="column"><md-input-container flex="20"><img style="border-radius: 50%; width: 125px; height: 125px;" src="https://getokular.com/img/user_1.jpg"></md-input-container><div><h1 class="panel-widget-tittle">{{vm.selectedUser.firstName}} {{vm.selectedUser.lastName}}</h1></div></div></md-content><div layout="" layout-sm="column"><div flex=""><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Dogs in care</span></h2></md-toolbar><md-content class="md-padding"><div layout="" layout-sm="column"><md-list flex=""><md-list-item class="md-1-line" ng-if="vm.selectedUserDogs.length == 0"><div><p>none</p></div></md-list-item><md-list-item class="md-2-line" ng-repeat="dog in vm.selectedUserDogs track by $index"><img ng-src="{{dog.profileUrl}}" class="md-avatar"><div class="md-list-item-text"><h3>{{dog.name}}</h3><p>{{dog.dogTypeId | dogTypeFilter}}</p></div></md-list-item></md-list></div></md-content></div></div><div layout="" layout-sm="column"><div flex="20"><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Phone</span></h2></md-toolbar><md-content class="md-padding"><md-list flex=""><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Phone Number</h3><p>{{vm.phone.phoneNumber || \'none\'}}</p></div></md-list-item></md-list></md-content></div><div flex="40"><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Property Information</span></h2></md-toolbar><md-content class="md-padding"><md-list flex=""><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Property Type</h3><p>{{(vm.property.houseTypeId | houseTypeFilter) || \'none\'}}</p></div></md-list-item><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Property Size</h3><p>{{vm.property.squareFeet || \'none\'}}</p></div></md-list-item></md-list></md-content></div><div flex="40"><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Address</span></h2></md-toolbar><md-content class="md-padding"><md-list flex=""><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Address Line 1</h3><p>{{vm.address.addressLine1 || \'none\'}}</p></div></md-list-item><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Postal Code</h3><p>{{vm.address.postalCode || \'none\'}}</p></div></md-list-item><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>City</h3><p>{{vm.address.city || \'none\'}}</p></div></md-list-item></md-list></md-content></div></div></div></div>'),t.put("app/views/main.html",'<md-sidenav md-is-locked-open="$mdMedia(\'gt-sm\')" md-component-id="left" class="md-whiteframe-z2 md-sidenav-left"><md-toolbar md-theme="custom" class="md-hue-1 md-whiteframe-z2"><md-button layout="row" layout-align="center center" class="md-toolbar-tools md-warn" href=""><h1>Sniffr</h1></md-button></md-toolbar><md-button ng-repeat-start="item in vm.menuItems" layout="column" layout-align="center center" flex="" class="capitalize" ng-click="vm.selectItem(item)" ui-sref-active="md-warn" ui-sref="{{item.sref}}"><div hide-sm="" hide-md="" class="md-tile-content"><i class="material-icons md-36">{{item.icon}}</i></div><div class="md-tile-content">{{item.name}}</div></md-button><md-divider ng-repeat-end=""></md-divider></md-sidenav><div layout="column" flex=""><md-toolbar layout="row" layout-align="center center"><section layout-align="start center" layout-fill="" flex=""><md-button hide-gt-sm="" ng-click="vm.toggleItemsList()" aria-label="Menu"><i class="material-icons">menu</i></md-button></section></md-toolbar><md-content flex="" class="md-padding page-content"><div ui-view="" ng-if="vm.auth.isAuthenticated()"></div><h4 ng-if="!vm.auth.isAuthenticated()">You are not logged in! Please<md-button ng-click="vm.auth.login()" class="md-raised md-accent">Log In</md-button></h4></md-content></div>')}]);