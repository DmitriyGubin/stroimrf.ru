var points = [
    [55.017751, 82.940237, "ул. Кирова 48, офис 707"],
    [55.040776, 82.930329, "ул. Крылова 36, офис 121"],
    [54.838250, 82.900541, "КП “Морские просторы”"]
];

//console.log(points[1][2]);

ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map("yndex_map", {
        center: [54.970000,82.925550],
        zoom: 9,
                //controls: [],//без элементов управления
            }, {
                searchControlProvider: 'yandex#search'
            }),
    // Создание макета содержимого хинта.
    // Макет создается через фабрику макетов с помощью текстового шаблона.
    HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='my-hint'>" +
        "{{ properties.address }}" +
        "</div>", {
                // Определяем метод getShape, который
                // будет возвращать размеры макета хинта.
                // Это необходимо для того, чтобы хинт автоматически
                // сдвигал позицию при выходе за пределы карты.
                getShape: function () {
                    var el = this.getElement(),
                    result = null;
                    if (el) {
                        var firstChild = el.firstChild;
                        result = new ymaps.shape.Rectangle(
                            new ymaps.geometry.pixel.Rectangle([
                                [0, 0],
                                [firstChild.offsetWidth, firstChild.offsetHeight]
                                ])
                            );
                    }
                    return result;
                }
            }
            );

    function Add_point(x, y, adress)
    {
        var myPlacemark = new ymaps.Placemark([x, y], {
        address: adress
        }, {
            hintLayout: HintLayout
        });

        myMap.geoObjects.add(myPlacemark);
    }

   
    for (let item of points)
    {
        Add_point(item[0], item[1], item[2]);
    }


    myMap.options.set('maxAnimationZoomDifference', Infinity);
    function ZoomToo(x,y)
    {
        myMap.panTo([x, y], {
            delay: 0,
            flying: true
        }).then(function() {
                            myMap.setZoom(15, { 
                              smooth: true,
                              duration: 1000
                          });
        });
    }

    var elements = document.querySelectorAll('.adress_plus_point');
    if(elements.length != 0)
    {
        for (let item of elements)
        {
            let adress = item.querySelector('p').innerHTML;
            item.querySelector('a').addEventListener('click',function(){
                for(let itemm of points)
                {
                    if(itemm[2] == adress)
                    {
                        myMap.balloon.close();
                        ZoomToo(Number(itemm[0]), Number(itemm[1]));

                        setTimeout(function() {
                            myMap.balloon.open([Number(itemm[0]), Number(itemm[1])], adress, { closeButton: true });
                        }, 1600);
                    }
                }
            });  
        }
    }
 }
