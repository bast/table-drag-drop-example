function range(start, count)
{
    return Array.apply(0, Array(count))
      .map(function (element, index) {
        return index + start;
    });
}


function construct_data_array(num_rows, num_columns)
{
    var array = [];
    for (var irow = 0; irow < num_rows; irow++)
    {
        var row = [];
        for (var icol = 0; icol < num_columns; icol++)
        {
            row.push([irow, icol]);
        }
        array.push(row);
    }
    return array;
}


var app = angular.module('myapp', ['ngDragDrop']);


app.controller('mycontroller', function($scope)
{
    num_rows = 5;
    num_columns = 3;

    $scope.array = construct_data_array(num_rows, num_columns);

    $scope.rows = range(0, num_rows);
    $scope.columns = range(0, num_columns);

    $scope.onDrop = function(target_x, target_y, source){
        var source_x = source[0];
        var source_y = source[1];

        var temp = $scope.array[target_x][target_y];

        $scope.array[target_x][target_y] = $scope.array[source_x][source_y];
        $scope.array[source_x][source_y] = temp;
    };

    // validation makes sure that we don't do anything if we drop a cell on itself
    $scope.dropValidate = function(target_x, target_y, source) {
        var source_x = source[0];
        var source_y = source[1];

        return !(target_x == source_x && target_y == source_y);
    };
});
