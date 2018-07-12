(function ($) {
    $(document).ready(function () {

        /* Панель навигации */
        // Описываем функцию, которая
        function lpHeader() {
            if ($(window).scrollTop() == 0) { // Если находимся в начале страницы
                $('header').addClass('top'); // Добавляет класс top для панели
            } else { // Иначе
                $('header.top').removeClass('top'); // Удаляет его
            }
        }
        // Вызываем эту функцию
        lpHeader(); // Единожды при загрузке страницы
        $(window).on('scroll', lpHeader); // И каждый раз при скролле

        /* Плавный скролл при клике на ссылку в меню */
        // Помещаем в переменную ссылку на меню
        var lpNav = $('header ul');
        // При клике на ссылку в меню
        lpNav.find('li a').on('click', function (e) {
            // Определяем элемент на странице, на который ссылается ссылка по ID
            var linkTrgt = $($(this).attr('href'));
            if (linkTrgt.length > 0) { // Если такой элемент присутствует
                e.preventDefault(); // Отменяем переход по умолчанию
                var offset = linkTrgt.offset().top; // Определяем отступ целевого элемента от начала документа
                $('body, html').animate({
                    scrollTop: offset - 44
                }, 750); // Плавно скролим документ к этому месту
            }
        });

        /* Отслеживание активного экрана */
        // Описываем функцию, которая вычисляет активный экран
        function lpSetNavActive() {
            // В этой переменной в конце each будет ID активного экрана
            var curItem = '';
            // Чтобы он туда попал, перебираем все экраны
            $('section').each(function () {
                // И если положение экрана от начала страницы меньше текущего скролла
                if ($(window).scrollTop() > $(this).offset().top - 200) {
                    curItem = $(this).attr('id'); // В переменную вносим ID этого экрана
                }
            });
            // Далее, если href ссылки внутри активного пункта меню не совпадает с ID найденного нами активного экрана
            // Либо активные элементы отсутствуют в меню
            if (lpNav.find('li.active a').attr('href') != '#' + curItem || lpNav.find('li.active').length == 0) {
                // Удаляем класс у текущего активного элемента
                lpNav.find('li.active').removeClass('active');
                // И добавляем класс active пункту, внутри которого лежит ссылка, у которой href совпал с ID активного экрана 
                lpNav.find('li a[href="#' + curItem + '"]').parent().addClass('active');
            }
        }
        // Вызываем эту функцию
        lpSetNavActive(); // Единожды при загрузке страницы
        $(window).on('load scroll', lpSetNavActive); // И каждый раз при скролле


        /* Слайдшоу */

        $('.lp-slider1').owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>']
        });
/*Занятие 7*/
        
        $(".lp-slider2").on("initialized.owl.carousel", function(){
              console.log("ready") ;
           });
         $('.lp-slider2').owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>']
        });
        $('.lp-slider2').on('changed.owl.carousel', function (e) {
             console.log(e.item.index + 1);
});
        $('.lp-slider2').on('resized.owl.carousel', function () {
            
             console.log("resized");
});        
      
        var a = $(".lp-slider2")
        $('button.choose').on('click', function() {
        var b = ($('input').val());
        a.trigger('to.owl.carousel', b - 1);
       
});

        /* Табулятор */

        // Для каждого табулятора на странице
        $('.lp-tabs').each(function () {
            // Помещаем корневой div в переменную tabs 
            var tabs = $(this),
                tabsTitlesNames = []; // А также объявляем массив, в котором будем хранить имена вкладок
            // Сохраняем все имена вкладок в массив
            tabs.find('div[data-tab-title]').each(function () {
                tabsTitlesNames.push($(this).attr('data-tab-title'));
            }).addClass('lp-tab');
            // Между корневым div и его содержимым добавляем div с классом "lp-tabs-content"
            tabs.wrapInner('<div class="lp-tabs-content"></div>');
            // В начало корневого div добавляем div с классом "lp-tabs-titles" и списком внутри
            tabs.prepend('<div class="lp-tabs-titles"><ul></ul></div>');
             
            // Помещаем в переменные:
            var tabsTitles = tabs.find('.lp-tabs-titles'), // Div c заголовками вкладок
                tabsContent = tabs.find('.lp-tabs-content'), // Div с содержимым вкладок
                tabsContentTabs = tabsContent.find('.lp-tab'); // Набор вкладок
            // Добавляем заголовки вкладок
            tabsTitlesNames.forEach(function (value) {
                tabsTitles.find('ul').append('<li>' + value + '</li>');
            });
            // Помещаем в переменную набор заголовков вкладок
            var tabsTitlesItems = tabsTitles.find('ul li');
            // Добавляем класс "active" первому заголовку
            tabsTitlesItems.eq(0).addClass('active');
            // Добавляем класс "active" первой вкладке и отображаем ее
            tabsContentTabs.eq(0).addClass('active').show();
            // Устанавливаем высоту div с содержимым вкладок равной высоте первой вкладки
            tabsContent.height(tabsContent.find('.active').outerHeight());
            // По клику на заголовке вкладки
            tabsTitlesItems.on('mouseenter', function () {
                // Проверяем, не находится ли табулятор в переходном состоянии
                if (!tabs.hasClass('changing')) {
                    // Если нет, то добавляем класс "changing", обозначающий переходное состояние
                    tabs.addClass('changing');
                    // Помещаем в переменные:
                    var curTab = tabsContent.find('.active'), // Активную вкладку
                        nextTab = tabsContentTabs.eq($(this).index()); // Следующую вкладку
                    // Убираем класс "active" у активного заголовка
                    tabsTitlesItems.removeClass('active');
                    // Добавляем класс "active" заголовку, по которому кликнули
                    $(this).addClass('active');
                    // Помещаем в переменную текущую высоту контента
                    var curHeight = curTab.outerHeight();
                    // Отображаем следующую вкладку
                    nextTab.show();
                    // Помещаем в переменную высоту контента следующей вкладки
                    var nextHeight = nextTab.outerHeight();
                    // Прячем следующую вкладку, пока никто ее не увидел
                    nextTab.hide();
                    // Если высота контента следующей вкладки больше
                    if (curHeight < nextHeight) {
                        // То плавно увеличиваем высоту блока с контентом до нужной высоты
                        tabsContent.animate({
                            height: nextHeight
                        }, 500);
                    }
                    // И параллельно прячем текщую вкладку
                    curTab.fadeOut(500, function () {
                        // По окончании анимации
                        // Если высота контента следующей вкладки меньше
                        if (curHeight > nextHeight) {
                            // То плавно уменьшаем высоту блока с контентом до нужной высоты
                            tabsContent.animate({
                                height: nextHeight
                            }, 500);
                        }
                        // И параллельно отображаем следующую вкладку
                        nextTab.fadeIn(500, function () {
                            // По окончании анимации
                            // Удаляем класс "active" у текущей (уже прошлой) вкладки
                            curTab.removeClass('active');
                            // Добавляем класс "active" следующей (уже текущей) вкладке
                            nextTab.addClass('active');
                            // Выводим табулятор из переходного состояния
                            tabs.removeClass('changing');
                        });
                    });

                }
             
           
            });
            /*   tabsTitlesNames.forEach(function (value){
                 if (tabs.hasClass('changing')){
            tabs.append('<div class="lp-tabs-footer"><h2>Активная вкладка:' + value +'/4 </h2></div>');}});*/
            // При изменении размера окна
            $(window).on('load resize', function () {
                // Устанавливаем высоту div с содержимым вкладок равной высоте активной вкладки
                tabsContent.height(tabsContent.find('.active').outerHeight());
            });
            
           
        });
/*Табулятор*/
        
        $(".lp-tabs").each(function(){
            
          var tabs = $(this),
              tabsTitlesNames = [];
            tabs.find("div[data-tab-title]").each(function(){
                tabsTitlesNames.push($(this).attr("data-tab-title"));
            }).addClass("lp-tab");
              
           tabs.wrapInner("<div class='lp-tabs-content'></div>");
           tabs.prepend("<div class='lp-tabs-titles'><ul></ul></div>");
           
            var tabsTitles = tabs.find(".lp-tabs-titles"),
                tabsContent = tabs.find(".lp-tabs-content"),
                tabsContentTabs = tabsContent.find(".lp-tab");
            
            tabsTitlesNames.forEach(function(value){
                tabsTitles.find("ul").append("<li>" + value + "</li>");
            });
            
            var tabsTitlesItems = tabsTitles.find("ul li");
            
            tabsTitlesItems.eq(0).addClass("active");
            tabsContentTabs.eq(0).addClass("active").show();
            
            tabsContent.height(tabsContent.find(".active").outerHeight());
            console.log(tabsContent.find(".active").outerHeight());
            
            tabsTitlesItems.on("click", function (){
                
                if(!tabs.hasClass("changing")) {
                    
                    tabs.addClass("changing");
                    
                    var curTab = tabsContent.find(".active"),
                        nextTab = tabsContentTabs.eq($(this).index());
                    
                    tabsTitlesItems.removeClass("active");
                    $(this).addClass("active");
                    
                    var curHeight = curTab.outerHeight();
                    nextTab.show();
                    var nextHeight = nextTab.outerHeight();
                    nextTab.hide();
                    
                    if( curHeight < nextHeight) {
                        
                        tabsContent.animate({
                            height: nextHeight
                        }, 500);
                    }
                    
                    curTab.fadeOut(500, function(){
                        
                       if( curHeight > nextHeight) {
                        
                        tabsContent.animate({
                            height: nextHeight
                        }, 500);
                       }
                        
                        nextTab.fadeIn(500, function(){
                            curTab.removeClass("active");
                            nextTab.addClass("active");
                            tabs.removeClass("changing");
                        });
                    });
                    
                    
                    
                }
                
                 
                
                
                
            });
            
               $(window).on("load resize", function(){
                tabsContent.height(tabsContent.find(".active").outerHeight());
            });
        });
          /* задание 3*/
        $('.lp-mfp-inline').magnificPopup({
            type: 'iframe',
            src: '/page1.html'
        });
        
        
        
        
    });
})(jQuery);
