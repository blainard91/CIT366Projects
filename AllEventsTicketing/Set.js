function Set() {
	
	
	this.intersection = function(listA, listB) {
    
	   var resultList = [];
       
	   if (listA === null || listB === null) {
	   	return null;
	   }

	   for (var i = 0; i < listA.length; i++) {
	   	var nextValue = listA[i];

	   		for (var j = 0; j < listB.length; j++) {
	   			if (listB[j] === nextValue) {
	   					resultList.push(listB[j]);
	   					break;
					}
			}
	   }
       
	   return resultList;
	};
    
    
    
	this.union = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }
        var i;

		for (i in listA) {
			resultList.push(listA[i]);
        }
		for (i in listB) {
			resultList.push(listB[i]);
		}

		var uniqueArray = [];
		for(var i = 0;i < resultList.length; i++){
			if(uniqueArray.indexOf(resultList[i]) == -1){
				uniqueArray.push(resultList[i]);
			}
		}
        resultList = uniqueArray;

	   
	   return resultList;
	};




	this.relativeComplement = function(listA, listB) {
		var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

        var intersection = [];

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];

            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) {
                    intersection.push(listB[j]);
                    break;
                }
            }
        }

        var i;

        for (i in listA) {
            if(intersection.indexOf(listA[i]) == -1){
            	resultList.push(listA[i]);
            }
        }

        return resultList;
	};

	this.symmetricDifference = function(listA, listB) {

	   var resultList = [];

        if (listA === null || listB === null) {
            return null;
        }

        var intersection = [];

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];

            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) {
                    intersection.push(listB[j]);
                    break;
                }
            }
        }

        var i;

        for (i in listA) {
            if(intersection.indexOf(listA[i]) == -1){
                resultList.push(listA[i]);
            }
        }

        for (i in listB) {
            if(intersection.indexOf(listB[i]) == -1){
                resultList.push(listB[i]);
            }
        }

	   return resultList;

	};
}
