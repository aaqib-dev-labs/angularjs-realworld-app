class HomeCtrl {
  constructor(User, Tags, AppConstants, $scope, $http) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;

    // Get list of all tags
    Tags
      .getAll()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );

    // Fetch Space News as a bonus open-source API feature
    $http.get('https://api.spaceflightnewsapi.net/v4/articles/?limit=3')
      .then((res) => {
        this.spaceNews = res.data.results;
      });

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };

  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default HomeCtrl;
