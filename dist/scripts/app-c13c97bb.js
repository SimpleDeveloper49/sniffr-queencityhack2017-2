!function(){"use strict";angular.module("app",["ngMaterial","firebase"])}(),function(){"use strict";function t(t){var e=[{name:"Dogs",icon:"pets",sref:".dogs"},{name:"Foster",icon:"person",sref:".foster"}];return{loadAllItems:function(){return t.when(e)}}}angular.module("app").service("navService",["$q",t])}(),function(){"use strict";function t(t,e,i){function a(){e.authorize()}function n(){}function d(){e.parseHash(function(e,a){if(a&&a.idToken){m(a);var d=a.idTokenPayload;n(d.sub,d.picture,d.family_name,d.given_name),t.go("home.dogs")}else e&&(i(function(){t.go("home.dogs")}),console.log(e),alert("Error: "+e.error+". Check the console for further details."))})}function l(t){var i=localStorage.getItem("access_token");if(!i)throw new Error("Access token must exist to fetch profile");e.client.userInfo(i,function(e,i){i&&o(i),t(e,i)})}function o(t){u=t}function s(){return u}function m(t){var e=JSON.stringify(1e3*t.expiresIn+(new Date).getTime());localStorage.setItem("access_token",t.accessToken),localStorage.setItem("id_token",t.idToken),localStorage.setItem("expires_at",e)}function r(){localStorage.removeItem("access_token"),localStorage.removeItem("id_token"),localStorage.removeItem("expires_at"),t.go("home.dogs")}function c(){var t=JSON.parse(localStorage.getItem("expires_at"));return(new Date).getTime()<t}var u;return{login:a,getProfile:l,getCachedProfile:s,handleAuthentication:d,logout:r,isAuthenticated:c}}angular.module("app").service("authService",t),t.$inject=["$state","angularAuth0","$timeout","$firebaseArray"]}(),function(){function t(t,e,i){var a=this;a.menuItems=[],a.title=e.current.data.title,a.auth=i,t.loadAllItems().then(function(t){a.menuItems=[].concat(t)})}angular.module("app").controller("MainController",["navService","$state","authService",t])}(),function(){function t(t){var e=this;e.users=[],e.selectedUser=null,e.selectedUserDogs=[],t.get("/api/users").then(function(t){for(var i=t.data,a=0;a<i.length;a++)(i[a].userTypeId=1)&&e.users.push(i[a])}),e.selectFoster=function(i){e.selectedUserDogs=[],t.get("/api/dogs").then(function(t){for(var a=t.data,n=0;n<a.length;n++)a[n].careGiverId==i&&e.selectedUserDogs.push(a[n])});for(var a=0;a<e.users.length;a++)e.users[a].userId==i&&(e.selectedUser=e.users[a])}}angular.module("app").controller("FosterController",["$http",t]).filter("dogTypeFilter",function(){return function(t){switch(t){case 1:return"German Shepherd";case 2:return"Rottweiler";case 3:return"Bulldog"}}})}(),function(){function t(t,e,i){var a=this;a.dogs=[],a.selectedDog=null,a.dogChat=null,a.newDog=null,a.users=[],a.newVaccination=null,a.newTraining=null,a.newMedicals=null,a.medicalInformation=[],a.fitness=[],a.vaccination=[],a.medicals=[],a.addVaccination=function(){var t={dogId:a.selectedDog.dogId,medicalInfoTypeId:1,info:a.newVaccination};a.vaccination.push(t),i.post("/api/medical_infos",t).then(function(){a.newVaccination=null})},a.addTraining=function(){var t={dogId:a.selectedDog.dogId,medicalInfoTypeId:3,info:a.newTraining};a.fitness.push(t),i.post("/api/medical_infos",t).then(function(){a.newTraining=null})},a.addMedicals=function(){var t={dogId:a.selectedDog.dogId,medicalInfoTypeId:2,info:a.newMedicals};a.medicals.push(t),i.post("/api/medical_infos",t).then(function(){a.newMedicals=null})},i.get("/api/users").then(function(t){a.users=t.data}),a.saveNewDog=function(){i.post("/api/dogs",a.newDog).then(function(){a.newDog=null,a.isNewDog=!1,i.get("/api/dogs").then(function(t){a.dogs=[].concat(t.data)})})},a.updateDog=function(){i.put("/api/dogs/"+a.selectedDog.dogId,a.selectedDog).then(function(){a.selectedDog=null,a.fitness=[],a.vaccination=[],a.medicals=[],i.get("/api/dogs").then(function(t){a.dogs=[].concat(t.data)})},function(t){console.log("ERROR"),console.log(t)})},a.selectDog=function(t){for(var e=0;e<a.dogs.length;e++)a.dogs[e].dogId==t&&(a.selectedDog=a.dogs[e],i.get("/api/medical_infos").then(function(e){for(var i=e.data,n=0;n<i.length;n++)if(i[n].dogId==t)switch(i[n].medicalInfoTypeId){case 1:a.vaccination.push(i[n]);break;case 2:a.medicals.push(i[n]);break;case 3:a.fitness.push(i[n])}a.medicalInformation=i}))},a.chatDog=function(i){function n(){var e=firebase.database().ref().child("users").child(i).child("conversations").child("llt0OfJsr1PgASaJNHbJ8DrkOH03");return t(e)}for(var d=0;d<a.dogs.length;d++)a.dogs[d].dogId==i&&(a.dogChat=a.dogs[d],a.selectedDog=null);a.dogChat&&n().$loaded().then(function(t){var i=firebase.database().ref().child("conversations").child(t.location);a.messages=e(i)})},a.addNewDog=function(){a.isNewDog=!0},a.isImage=function(t){var e=t.substring(0,4);return"http"===e},a.newMessage="",a.dogTypes=[{id:1,description:"German Shepherd"},{id:2,description:"Rottweiler"},{id:3,description:"Bulldog"}],a.adoptionStatuses=[{id:1,description:"Pending"},{id:2,description:"Quarantine"},{id:3,description:"Ready for Adoption"},{id:4,description:"Adopted"}],a.sendMessage=function(){var t=Math.floor(Date.now()/1e3);a.messages.$add({content:a.newMessage,fromID:"-KvDnWsYX02UNsDubi4Y",isRead:!1,timestamp:t,toID:"pTMxPeFGGyb2LpEpNFZatdbJFY12",type:"text"}),a.newMessage=""},i.get("/api/dogs").then(function(t){a.dogs=[].concat(t.data)})}angular.module("app").filter("dogTypeFilter",function(){return function(t){switch(t){case 1:return"German Shepherd";case 2:return"Rottweiler";case 3:return"Bulldog"}}}).filter("adoptionStatusFilter",function(){return function(t){switch(t){case 1:return"Pending";case 2:return"Quarantine";case 3:return"Ready for Adoption";case 4:return"Adopted"}}}).controller("DogsController",["$firebaseObject","$firebaseArray","$http",t]).filter("userFilter",function(){return function(t,e){return e?e[0].firstName+" "+e[0].lastName:void 0}})}(),function(){"use strict";function t(){}angular.module("app").controller("CallbackController",t)}(),angular.module("angularMaterialAdmin",["ngAnimate","ngCookies","ngSanitize","ui.router","ngMaterial","nvd3","app","md.data.table","auth0.auth0"]).config(["$stateProvider","$urlRouterProvider","$mdThemingProvider","$mdIconProvider","angularAuth0Provider",function(t,e,i,a,n){t.state("home",{url:"",templateUrl:"app/views/main.html",controller:"MainController",controllerAs:"vm","abstract":!0}).state("home.foster",{url:"/foster",templateUrl:"app/views/foster.html",controller:"FosterController",controllerAs:"vm",data:{title:"Foster"}}).state("home.callback",{url:"/callback",controller:"CallbackController",templateUrl:"app/views/callback.html",controllerAs:"vm"}).state("home.dogs",{url:"/dogs",controller:"DogsController",controllerAs:"vm",templateUrl:"app/views/dogs.html",data:{title:"Dogs"}}),n.init({clientID:AUTH0_CLIENT_ID,domain:AUTH0_DOMAIN,responseType:"token id_token",audience:"https://"+AUTH0_DOMAIN+"/userinfo",redirectUri:AUTH0_CALLBACK_URL,scope:"openid profile"}),e.otherwise("/dogs"),i.theme("default").primaryPalette("grey",{"default":"600"}).accentPalette("teal",{"default":"500"}).warnPalette("defaultPrimary"),i.theme("dark","default").primaryPalette("defaultPrimary").dark(),i.theme("grey","default").primaryPalette("grey"),i.theme("custom","default").primaryPalette("defaultPrimary",{"hue-1":"50"}),i.definePalette("defaultPrimary",{50:"#FFFFFF",100:"rgb(255, 198, 197)",200:"#E75753",300:"#E75753",400:"#E75753",500:"#E75753",600:"#E75753",700:"#E75753",800:"#E75753",900:"#E75753",A100:"#E75753",A200:"#E75753",A400:"#E75753",A700:"#E75753"}),a.icon("user","assets/images/user.svg",64)}]),function(){"use strict";function t(t){t.handleAuthentication()}angular.module("app").run(t),t.$inject=["authService"]}(),angular.module("angularMaterialAdmin").run(["$templateCache",function(t){t.put("app/views/callback.html",'<div class="loading"><img src="assets/loading.svg" alt="loading"></div>'),t.put("app/views/dogs.html",'<div class="table-responsive-vertical md-whiteframe-z1"><table id="table" class="table table-hover table-bordered" ng-if="!vm.selectedDog && !vm.dogChat && !vm.isNewDog"><thead><tr><th></th><th>Dog Name</th><th>Dog Type</th><th>Foster</th><th>Adoption Status</th><th></th></tr></thead><tbody><tr ng-repeat="data in vm.dogs track by $index"><td style="text-align: center;"><md-list-item><img ng-src="{{data.profileUrl}}" class="md-avatar"></md-list-item></td><td style="vertical-align: middle!important;" data-title="Dog Name">{{data.name}}</td><td style="vertical-align: middle!important;" data-title="Dog Type">{{data.dogTypeId | dogTypeFilter}}</td><td style="vertical-align: middle!important;" data-title="Foster">{{data.careGiverId | userFilter : vm.users}}</td><td style="vertical-align: middle!important;" data-title="Adoption Status">{{data.adoptionStatus | adoptionStatusFilter}}</td><td style="vertical-align: middle!important; text-align: right;"><md-button ng-click="vm.selectDog(data.dogId)" class="md-raised md-accent">View</md-button></td></tr></tbody><tfoot><tr><td colspan="6" style="text-align: right"><md-button ng-click="vm.addNewDog()" class="md-raised md-accent">Add Dog</md-button></td></tr></tfoot></table><div ng-if="vm.selectedDog"><md-content md-theme="dark" class="md-padding"><div layout="" layout-sm="column"><md-input-container flex="20"><img style="border-radius: 50%; width: 125px; height: 125px;" ng-src="{{vm.selectedDog.profileUrl}}"></md-input-container><div flex="80"><div layout="" layout-sm="column"><md-input-container flex=""><label>Dog Name</label> <input ng-model="vm.selectedDog.name"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Dog Type</label><md-select ng-model="vm.selectedDog.dogTypeId"><md-option ng-value="dogType.id" ng-repeat="dogType in vm.dogTypes">{{ dogType.description }}</md-option></md-select></md-input-container><md-input-container flex=""><label>Adoption Status</label><md-select ng-model="vm.selectedDog.adoptionStatus"><md-option ng-value="adoptionStatus.id" ng-repeat="adoptionStatus in vm.adoptionStatuses">{{ adoptionStatus.description }}</md-option></md-select></md-input-container></div></div></div></md-content><md-content class="md-padding"><form name="userForm"><div layout="" layout-sm="column"><md-input-container flex=""><label>Height</label> <input ng-model="vm.selectedDog.height"></md-input-container><md-input-container flex=""><label>Age</label> <input ng-model="vm.selectedDog.age"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Weight</label> <input ng-model="vm.selectedDog.weight"></md-input-container><md-input-container flex=""><label>Eligble Foster Parents</label><md-select ng-model="vm.selectedDog.careGiverId"><md-option ng-value="user.userId" ng-repeat="user in vm.users">{{ user.firstName + " " + user.lastName }}</md-option></md-select></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Profile Url</label> <input ng-model="vm.selectedDog.profileUrl"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>About</label> <textarea ng-model="vm.selectedDog.about" columns="1" md-maxlength="140"></textarea></md-input-container></div><div layout="" layout-sm="column"><div flex=""><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Vaccination</span></h2></md-toolbar><md-content class="md-padding"><div layout="" layout-sm="column"><md-list flex=""><md-list-item class="md-2-line" ng-repeat="item in vm.vaccination"><div class="md-tile-content md-avatar"><i class="material-icons md-36">add_circle_outline</i></div><div class="md-list-item-text" layout="column"><h3>{{item.info}}</h3><p>{{item.created_at | date:\'yyyy-MM-dd\'}}</p></div></md-list-item><md-list-item><div class="md-list-item-text"><md-input-container flex=""><label>New Vaccination</label> <input ng-model="vm.newVaccination"></md-input-container><md-button class="md-raised md-accent" ng-click="vm.addVaccination()"><i class="material-icons md-36">add</i></md-button></div></md-list-item></md-list></div></md-content></div><div flex=""><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Medicals</span></h2></md-toolbar><md-content class="md-padding"><div layout="" layout-sm="column"><md-list flex=""><md-list-item class="md-2-line" ng-repeat="item in vm.medicals"><div class="md-tile-content md-avatar"><i class="material-icons md-36">favorite</i></div><div class="md-list-item-text" layout="column"><h3>{{item.info}}</h3><p>{{item.created_at | date:\'yyyy-MM-dd\'}}</p></div></md-list-item><md-list-item><div class="md-list-item-text"><md-input-container flex=""><label>New Medicals</label> <input ng-model="vm.newMedicals"></md-input-container><md-button class="md-raised md-accent" ng-click="vm.addMedicals()"><i class="material-icons md-36">add</i></md-button></div></md-list-item></md-list></div></md-content></div><div flex=""><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Training</span></h2></md-toolbar><md-content class="md-padding"><div layout="" layout-sm="column"><md-list flex=""><md-list-item class="md-2-line" ng-repeat="item in vm.fitness"><div class="md-tile-content md-avatar"><i class="material-icons md-36">fitness_center</i></div><div class="md-list-item-text" layout="column"><h3>{{item.info}}</h3><p>{{item.created_at | date:\'yyyy-MM-dd\'}}</p></div></md-list-item><md-list-item><div class="md-list-item-text"><md-input-container flex=""><label>New Training</label> <input ng-model="vm.newTraining"></md-input-container><md-button class="md-raised md-accent" ng-click="vm.addTraining()"><i class="material-icons md-36">add</i></md-button></div></md-list-item></md-list></div></md-content></div></div><div layout="" layout-sm="column"><md-input-container style="text-align: right;" flex=""><md-button ng-click="vm.chatDog(vm.selectedDog.dogId)" class="md-raised md-accent">Chat</md-button><md-button ng-click="vm.updateDog()" class="md-raised md-accent">Update</md-button></md-input-container></div></form></md-content></div><div ng-if="vm.isNewDog"><md-content md-theme="dark" class="md-padding"><div layout="" layout-sm="column"><md-input-container flex="20"><img style="border-radius: 50%; width: 125px; height: 125px;" ng-src="{{vm.newDog.profileUrl}}"></md-input-container><div flex="80"><div layout="" layout-sm="column"><md-input-container flex=""><label>Dog Name</label> <input ng-model="vm.newDog.name"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Dog Type</label><md-select ng-model="vm.newDog.dogTypeId"><md-option ng-value="dogType.id" ng-repeat="dogType in vm.dogTypes">{{ dogType.description }}</md-option></md-select></md-input-container><md-input-container flex=""><label>Adoption Status</label><md-select ng-model="vm.newDog.adoptionStatus"><md-option ng-value="adoptionStatus.id" ng-repeat="adoptionStatus in vm.adoptionStatuses">{{ adoptionStatus.description }}</md-option></md-select></md-input-container></div></div></div></md-content><md-content class="md-padding"><form name="userForm"><div layout="" layout-sm="column"><md-input-container flex=""><label>Height</label> <input ng-model="vm.newDog.height"></md-input-container><md-input-container flex=""><label>Age</label> <input ng-model="vm.newDog.age"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Weight</label> <input ng-model="vm.newDog.weight"></md-input-container><md-input-container flex=""><label>Eligble Foster Parents</label><md-select ng-model="vm.newDog.careGiverId"><md-option ng-value="user.userId" ng-repeat="user in vm.users">{{ user.firstName + " " + user.lastName }}</md-option></md-select></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Profile Url</label> <input ng-model="vm.newDog.profileUrl"></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>About</label> <textarea ng-model="vm.newDog.about" columns="1" md-maxlength="140"></textarea></md-input-container></div><div layout="" layout-sm="column"><md-input-container style="text-align: right;" flex=""><md-button ng-click="vm.saveNewDog()" class="md-raised md-accent">Save</md-button></md-input-container></div></form></md-content></div><div ng-if="vm.dogChat"><div layout="" layout-sm="column"><md-input-container flex="" style="background-color: white;"><form class="chat"><span></span><div class="messages" id="collabthread"><div class="message" ng-repeat="m in vm.messages"><div ng-class="(m.fromID!=\'llt0OfJsr1PgASaJNHbJ8DrkOH03\' ) ? \'in\': \'out\'"><span ng-show="false" class="initial">{{m.fromID }}</span><p ng-if="!vm.isImage(m.content)">{{m.content}}</p><img ng-if="vm.isImage(m.content)" src="{{m.content}}" width="300px" height="300px"><date ng-if="m.fromID!=\'llt0OfJsr1PgASaJNHbJ8DrkOH03\'"><b>Me</b> {{m.timestamp | date:"MM/dd \'at\' h:mma "}}</date><date ng-if="m.fromID==\'llt0OfJsr1PgASaJNHbJ8DrkOH03\'"><b>Landon</b> {{m.timestamp | date:"MM/dd \'at\' h:mma "}}</date></div></div></div></form></md-input-container></div><div layout="" layout-sm="column"><md-input-container flex=""><label>Message</label> <textarea ng-model="vm.newMessage" columns="1" md-maxlength="140"></textarea></md-input-container><md-button ng-click="vm.sendMessage()" class="md-raised md-accent">Send</md-button></div></div></div>'),t.put("app/views/foster.html",'<div class="table-responsive-vertical md-whiteframe-z1"><table id="table" class="table table-hover table-bordered" ng-if="!vm.selectedUser"><thead><tr><th></th><th>First Name</th><th>Last Name</th><th>Standing</th><th></th></tr></thead><tbody><tr ng-repeat="data in vm.users track by $index"><td style="text-align: center;"><md-list-item><img src="https://getokular.com/img/user_1.jpg" class="md-avatar"></md-list-item></td><td style="vertical-align: middle!important;" data-title="First Name">{{data.firstName}}</td><td style="vertical-align: middle!important;" data-title="Last Type">{{data.lastName}}</td><td style="vertical-align: middle!important;" data-title="Standing">Approved</td><td style="vertical-align: middle!important; text-align: right;"><md-button ng-click="vm.selectFoster(data.userId)" class="md-raised md-accent">View</md-button></td></tr></tbody></table><div ng-if="vm.selectedUser"><md-content md-theme="dark" class="md-padding"><div layout="" layout-sm="column"><md-input-container flex="20"><img style="border-radius: 50%; width: 125px; height: 125px;" src="https://getokular.com/img/user_1.jpg"></md-input-container><div><h1 class="panel-widget-tittle">{{vm.selectedUser.firstName}} {{vm.selectedUser.lastName}}</h1><h2 class="panel-widget-tittle">Phone #: +1(306)535-4213</h2></div></div></md-content><div layout="" layout-sm="column"><div flex=""><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Dogs in care</span></h2></md-toolbar><md-content class="md-padding"><div layout="" layout-sm="column"><md-list flex=""><md-list-item class="md-2-line" ng-repeat="dog in vm.selectedUserDogs track by $index"><img ng-src="{{dog.profileUrl}}" class="md-avatar"><div class="md-list-item-text"><h3>{{dog.name}}</h3><p>{{dog.dogTypeId | dogTypeFilter}}</p></div></md-list-item></md-list></div></md-content></div></div><div layout="" layout-sm="column"><div flex="40"><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Availability</span></h2></md-toolbar><md-content class="md-padding"><div layout="" layout-sm="column"><md-list flex=""><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Monday</h3><p>8:00 am - 5:00 pm</p></div></md-list-item><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Tuesday</h3><p>8:00 am - 5:00 pm</p></div></md-list-item><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Wednesday</h3><p>8:00 am - 5:00 pm</p></div></md-list-item><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Thursday</h3><p>8:00 am - 5:00 pm</p></div></md-list-item></md-list><md-list flex=""><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Friday</h3><p>8:00 am - 5:00 pm</p></div></md-list-item><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Saturday</h3><p>-</p></div></md-list-item><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Sunday</h3><p>-</p></div></md-list-item></md-list></div></md-content></div><div flex="60"><md-toolbar class="md-theme-light"><h2 class="md-toolbar-tools"><span>Property Information</span></h2></md-toolbar><md-content class="md-padding"><md-list flex=""><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Property Type</h3><p>Farm</p></div></md-list-item><md-list-item class="md-2-line"><div class="md-list-item-text"><h3>Property Size</h3><p>1500 square feet</p></div></md-list-item></md-list></md-content></div></div></div></div>'),t.put("app/views/main.html",'<md-sidenav md-is-locked-open="$mdMedia(\'gt-sm\')" md-component-id="left" class="md-whiteframe-z2 md-sidenav-left"><md-toolbar md-theme="custom" class="md-hue-1 md-whiteframe-z2"><md-button layout="row" layout-align="center center" class="md-toolbar-tools md-warn" href=""><h1>Sniffr</h1></md-button></md-toolbar><md-button ng-repeat-start="item in vm.menuItems" layout="column" layout-align="center center" flex="" class="capitalize" ng-click="vm.selectItem(item)" ui-sref-active="md-warn" ui-sref="{{item.sref}}"><div hide-sm="" hide-md="" class="md-tile-content"><i class="material-icons md-36">{{item.icon}}</i></div><div class="md-tile-content">{{item.name}}</div></md-button><md-divider ng-repeat-end=""></md-divider></md-sidenav><div layout="column" flex=""><md-toolbar layout="row" layout-align="center center"><section layout-align="start center" layout-fill="" flex=""><md-button hide-gt-sm="" ng-click="vm.toggleItemsList()" aria-label="Menu"><i class="material-icons">menu</i></md-button></section></md-toolbar><md-content flex="" class="md-padding page-content"><div ui-view="" ng-if="vm.auth.isAuthenticated()"></div><h4 ng-if="!vm.auth.isAuthenticated()">You are not logged in! Please <a ng-click="vm.auth.login()">Log In</a> to continue.</h4></md-content></div>')}]);