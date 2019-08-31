// створюємо в хеді документу тег стилів та даємо йому id для ідентифікації в подальшому
setTimeout(function () {
    (function createStylesTagInHead() {
        const styles = document.createElement("style");
        const mainHead = document.querySelector("head");

        mainHead.append(styles);

        styles.type = 'text/css';
        styles.id = "dos_styles_sheet";

    })();

    // собсна весь хтмл я вставлю саме так, бо гємора буде хоть жопой жуй, якшо я буду верстати на ванільному JS, як даун
    (function allPluginHTML() {
        const _allHTML = `
    <input type="submit" id="dos_open_button" class="dos_buttons" value="Показать">
    <div id="dos_list_wrapper" class="dos_list_wrapper_unactive">
        <div id="dos_select_wrapper" class="dos_select_wrapper">
            <select id="dos_templates_options" class="dos_select_list">
                <option selected disabled>Категория</option>
            </select>
            <input value="╋" title="Добавить новый шаблон описания" type="submit" id="dos_add_new_option" class="dos_buttons dos_button_add">
        </div>
        <input type="submit" value="Вставить" id="dos_paste_button" class="dos_buttons">
        <input type="submit" value="Вернуть" id="dos_reset_button" class="dos_buttons dos_reset_button" title="Откатить состояние полей на момент загрузки страницы">
        
        <div id="dos_preview_block" class="dos_preview_block">
            <label for="dos_preview_area_ru">RU</label> 
            <textarea readonly placeholder="Только для чтения..." name="RU" id="dos_preview_area_ru" cols="30" rows="8" placeholder="Только для чтения" class="dos_text_area"></textarea>
            <label for="dos_preview_area_ua">UA</label> 
            <textarea readonly placeholder="Только для чтения..." name="UA" id="dos_preview_area_ua" cols="30" rows="8" placeholder="Только для чтения" class="dos_text_area"></textarea>
        </div>
    </div>
    `;

        let _dos_wrapper = document.createElement("div");
        _dos_wrapper.id = "dos_wrapper";
        _dos_wrapper.className = "dos_wrapper";
        document.body.prepend(_dos_wrapper);
        _dos_wrapper.innerHTML = _allHTML;
    })();

    // пакуємо айдішнік стилів з хеду в константу
    const styles = document.querySelector("#dos_styles_sheet");

    let arr = [];

    let dos_target_area_ru = document.querySelectorAll("iframe")[0].contentDocument.body,
        dos_target_area_ua = document.querySelectorAll("iframe")[1].contentDocument.body,
        teasers_ru = document.querySelector("#teaser-ru"),
        teasers_uk = document.querySelector("#teaser-uk"),
        
        // category = document.querySelector("select#selectCategoryId").selectedOptions,
        state;


    // модель створення стилів, та їх розміщення в тегу <style> усередині <head> сайта
    class CSS_Style {
        constructor(name, props) {
            this.innerHTML = `${name} { ${props} }`;
            return styles.innerHTML += this.innerHTML;
        };
    };

    // собсна безпосереднє створення цих самих стилів та
    (function () {
        const dos_wrapper_allInsideClass = new CSS_Style('.dos_wrapper  *', `
            outline: none;
            outline: 0;
        `)
        const dos_wrapperClass = new CSS_Style('.dos_wrapper', `
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5em;
    
    height: 49px;
    background-color: rgb(233, 233, 233);
    transition: 0.2s;
    z-index: 1;
    box-shadow: 0px 0px 12px 3px #4c4c4c4d;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
`);
        const dos_buttonsClass = new CSS_Style('.dos_buttons', `
        display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    min-width: 234px;
    box-sizing: border-box;
    background: #86868645;
    border: none;
    border-radius: 5px;
    z-index: 100;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1em;
    transition: 0.18s;
`);
        const dos_buttons_hoverClass = new CSS_Style('.dos_buttons:hover', `
            background-color: #444444;
            color: white;
        `)
        const dos_list_wrapperClassUnactive = new CSS_Style('.dos_list_wrapper_unactive', `
    display: none;
`);
        const dos_list_wrapperClass = new CSS_Style('.dos_list_wrapper', `
    display: flex;
    flex-direction: column;
    align-items: center;
`)

        const dos_select_listClass = new CSS_Style('.dos_select_list', `
    display: flex;
    height: 48px;
    border: none;
    border-radius: 15px 0 0 15px;
    font-size: unset;
    padding-left: 0.3em;
    padding-right: 0.5em;
    width: 185px;
`);
const dos_reset_buttonClass = new CSS_Style('.dos_reset_button',`
        margin-top: 0.5em;
`)
        const dos_preview_blockClass = new CSS_Style('.dos_preview_block', `
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1em;
    margin-bottom: 1em;
    `);
        const dos_text_areaClass = new CSS_Style(`.dos_text_area`, `width: 220px; height: 120px`);
        const dos_select_wrapperClass = new CSS_Style(`.dos_select_wrapper`, `
display: flex;
border-top: 1px solid;
flex-direction: row;
justify-content: center;
align-items: center;
margin: 1em 0 0 ;
padding: 1em 0;
width: -webkit-fill-available;
`);
        const dos_button_add = new CSS_Style(`.dos_button_add`, `
    display: flex;
    min-width: 20px;
    width: 25px;
    line-height: 0px;
    border-radius: 0 15px 15px 0;
    border: none;
    background: #c8d7ff;
    padding: 22px 25px 25px 25px;
`)
    })();

    
    // для збереження початкового стану (тексту html) внутрішнього документу
    (function getStateOfAreas() {
        state = {
            stateRU: String(dos_target_area_ru.innerHTML),
            stateUA: String(dos_target_area_ua.innerHTML)
        };
    })();

    // для установки  початкового стану (скидування)
    function setStateToAreas() {
        console.log(state.stateRU);
        dos_target_area_ru.innerHTML = state.stateRU;
        dos_target_area_ua.innerHTML = state.stateUA;
    }

    // функція старту плагіна та його логіки
    function _dos_template_start() {
        // визначення усіх елементів плагіну
        const dos_wrapper = document.querySelector("#dos_wrapper"),
            dos_openButton = document.querySelector("#dos_open_button"),
            dos_list_wrapper = document.querySelector("#dos_list_wrapper"),
            dos_templates_options = document.querySelector("#dos_templates_options"),
            dos_paste_button = document.querySelector("#dos_paste_button"),
            dos_reset_button = document.querySelector("#dos_reset_button"),
            dos_preview_block = document.querySelector("#dos_preview_block"),
            dos_preview_area_ru = document.querySelector("#dos_preview_area_ru"),
            dos_preview_area_ua = document.querySelector("#dos_preview_area_ua"),
            dos_add_new_option = document.querySelector("#dos_add_new_option"),


            textareas = dos_preview_block.querySelectorAll("textarea"),

        // та створення деяких елементів
            dos_saveButton = document.createElement(`input`),
            dos_cancelButton = document.createElement('input');
            
            dos_saveButton.value = "Сохранить"
            dos_saveButton.type = "submit";

            dos_cancelButton.value = "Отмена";
            dos_cancelButton.type = "submit";

        //модель створення опцій для списку select
        class Template {
            constructor(label, textRU, textUA) {
                this.ru = String(textRU);
                this.ua = String(textUA);
                
                this.option = document.createElement("option");
                this.option.label = label;
                this.option.value = label;
                arr.push(this);
                dos_templates_options.append(this.option);
                return label = {
                        ru: String(textRU),
                        ua: String(textUA),
                       
                }
            };
        };

        // створення опцій
        (function(){
            const sim_holder = new Template(`Держатели SIM-карт`, `
            <p><strong>{$prefix}&nbsp;{$brand_name}&nbsp;{$name}&nbsp;{$mod}.</strong></p><p style="margin-bottom: 24px;"><u><strong>Держатель SIM-карты (лоток) смартфона</strong></u>&nbsp;&mdash; это маленькая и довольно хрупкая деталь. Держатели к разным смартфонам изготовлены из разных материалов, в зависимости от бренда и модели: пластик, метал, а также композитные. Наиболее осторожными нужно быть с пластиковым держателем, так как он является самым хрупким, металлические, в свою очередь - чаще теряются. Ломаются держатели от того, что их вставляют небрежно или не той стороной, также при неосторожной установке сим-карты. В худшем случае, вы можете повредить контактные усики внутри разъема (коннектора) или вовсе отломать разъем от контактов платы. Ломают держатели реже, так как владельцами устройств используется совсем не часто. Самой распостраненной причиной замены нового держателя является потеря старого.</p><hr/><div>Когда нужно купить новый держатель сим карты:</div><div>&nbsp;</div><div>держатель был утерян;</div><div>сим-лоток деформирован;</div><div>на поверхность лотка попадала вода или любая другая жидкость;</div><div>появление ржавчины на лотке (в случае металлических держателей);</div><div>отсутствует часть или половина сим держателя;</div><div>если слот симкарты застрял в неподвижном положении - следует обратится в сервисный центр.<br/>​</div><hr/><p style="margin-bottom: 24px;"><br/>Если же у вас недостаточно опыта в обращении с техникой или составляющими мелкими деталями - не стоит самостоятельно пытаться склеить или почистить лоток. Также категорически не рекомендуем использовать держатель с другой модели смартфона.&nbsp;</p><p style="margin-bottom: 24px;">Обратитесь в сервисный центр нашего магазина, где наши сотрудники проведут диагностику устройства, сообщат вам о поломке, помогут выбрать нужный товар и проконсультируют вас.</p><style type="text/css">.gost:hover{color: green; /* Цвет ссылки */}</style>`, `
            <div><div><strong>{$prefix}{$brand_name}{$name}{$mod}.</strong></div><div>&nbsp;</div><div><u><strong>Тримач SIM-карти (лоток) смартфона</strong></u>&nbsp;- це маленька і досить тендітна деталь. Тримачі до різних смартфонів виготовлені з різних матеріалів, залежно від бренду та моделі: пластик, метал, а також композитні. Найбільш обережними потрібно бути з пластиковим тримачем, так як він є найтендітнішим, металеві, в свою чергу - частіше губляться. Ламаються тримачі від того, що їх вставляють недбало або не тією стороною, а також при необережній установці сім-карти. У гіршому випадку, ви можете пошкодити контактні вусики всередині роз&#39;єму (коннектора) або зовсім відламати роз&#39;єм від контактів плати. Ламають тримачі рідше, так як власниками пристроїв використовується зовсім не часто. Найбільш поширеною причиною заміни тримача є втрата старого.</div><div>&nbsp;</div><div><hr/><div>Коли варто купувати новий тримач сім:</div></div><ul><li>&nbsp;</li><li><div>тримач був загублений;</div><div>сім-лоток деформований;</div><div>відсутня частина або половина лотка;</div><div>на поверхню лотка потрапляла вода або будь-яка інша рідина;</div><div>поява іржі на лотку (в разі металевих утримувачів);</div><div>якщо слот сім карти застряг в нерухомому положенні - варто звернутися до сервісного центру.</div><div>&nbsp;</div></li></ul><div><hr/><p><br/>Якщо ж у вас недостатньо досвіду в поводженні з технікою або складовими дрібними деталями - не варто самостійно намагатися склеїти або очистити лоток. Також категорично не рекомендуємо використовувати тримач з іншої моделі смартфона.</p></div><div>&nbsp;</div><div>Зверніться в сервісний центр нашого магазину, де наші співробітники проведуть діагностику пристрої, повідомлять вам про поломку, допоможуть вибрати потрібний товар і проконсультують вас.</div><div>&nbsp;</div></div><style type="text/css">.gost:hover{color: green; /* Цвет ссылки */}</style>
        `);
        const micro = new Template(`Микрофоны`, `
            <div><span style="font-family:tahoma,geneva,sans-serif;"><u><strong>Микрофон</strong></u> - одна из важнейших деталей смартфона, так как именно с помощью его мы можем общаться с другими людьми и сложно было бы себе представить телефон без микрофона. Основной задачей микрофона является преобразование звуковых волн в электромагнитные. Зачастую, производители устанавливают в свои мобильные устройства микрофоны 2-х типов: микрофон шумоподавления и цифровой (основной).&nbsp; Данные компоненты часто распаяны на нижней плате телефона. А наружу видны только крохотные круглые отверстия в нижней части корпуса. В случае с основным микрофоном, именно через такое отверстие звук и поступает в микрофон.</span></div><div>&nbsp;</div><div><span style="font-family:tahoma,geneva,sans-serif;">Основные <strong>признаки</strong> неисправности микрофона:</span><br/>&nbsp;</div><ul><li><span style="font-family:tahoma,geneva,sans-serif;">ваш собеседник плохо вас слышит или не слышит вовсе;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">вы или ваш собеседник слышите шум во время звонка;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">микрофон перестает работать в отдельном приложении.</span></li></ul><div>&nbsp;</div><div><span style="font-family:tahoma,geneva,sans-serif;"><strong>Причины</strong> неисправности:</span><br/>&nbsp;</div><ul><li><span style="font-family:tahoma,geneva,sans-serif;">повреждение шлейфа;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">в микрофон попадала влага или пыль;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">микрофон физически поврежден;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">программные неполадки устройства.</span></li></ul><div>&nbsp;</div><div><span style="font-family:tahoma,geneva,sans-serif;">В таком случае, не стоит пытаться самостоятельно чистить или чинить микрофон, не имея опыта такой работы, подобные действия могут привести к повреждению корпуса, самого микрофона или платы, на которой тот расположен.</span></div><div><span style="font-family:tahoma,geneva,sans-serif;">Обратитесь в сервисный центр нашего магазина, где наши сотрудники проведут диагностику устройства, сообщат вам о поломке и проконсультируют вас.</span></div>`, `
            <div><span style="font-family:tahoma,geneva,sans-serif;"><u><strong>Мікрофон</strong></u> - одна з найважливіших деталей смартфона, так як саме за допомогою нього ми можемо спілкуватися з іншими людьми і важко було б собі уявити телефон без мікрофона. Головною завданням мікрофону є перетворення звукових хвиль на електромагнітні. Часто, виробники встановлюють в свої мобільні пристрої мікрофони 2-х типів: мікрофон шумозаглушення та цифровий(основний). Дані компоненти часто розпаяні на нижній платі телефону. А назовні видно тільки крихітні круглі отвори в нижній частині корпусу. У випадку з основним мікрофоном, саме через такий отвір звук і потрапляє до мікрофону.&nbsp;</span><br/>&nbsp;</div><div><span style="font-family:tahoma,geneva,sans-serif;">Основні <strong>ознаки </strong>несправності мікрофона:</span></div><div>&nbsp;</div><ul><li><span style="font-family:tahoma,geneva,sans-serif;">ваш співрозмовник погано вас чує або не чує зовсім;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">ви або ваш співрозмовник чуєте шум під час дзвінка;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">мікрофон перестає працювати в окремому додатку.</span></li></ul><div><br/><span style="font-family:tahoma,geneva,sans-serif;"><strong>Причини </strong>несправності:</span></div><div>&nbsp;</div><ul><li><span style="font-family:tahoma,geneva,sans-serif;">пошкодження шлейфу;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">в мікрофон потрапляла волога або пил;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">мікрофон фізично пошкоджений;</span></li><li><span style="font-family:tahoma,geneva,sans-serif;">програмні збої.</span></li></ul><div>&nbsp;</div><div><span style="font-family:tahoma,geneva,sans-serif;">В такому випадку, не варто намагатися самостійно чистити або лагодити мікрофон, не маючи досвіду такої роботи, подібні дії можуть привести до пошкодження корпусу, самого мікрофона або плати зарядки, на якій той розміщений.</span></div><div><span style="font-family:tahoma,geneva,sans-serif;">Зверніться в сервісний центр нашого магазину, де наші співробітники проведуть діагностику пристрої, повідомлять вам про поломку і проконсультують вас.</span></div>
        `);
        const camera_lens = new Template(`Стекла камеры`, `
            <p><strong>{$prefix}&nbsp;{$brand_name}&nbsp;{$name}&nbsp;{$mod}.</strong></p><p><u><strong>Стекло камеры</strong></u>&nbsp;- наружная часть камеры устройства, которая не является составной модуля камеры, а крепится поверх модуля, также может быть частью задней крышки корпуса смартфона и выступать наружу. Основной функцией стекла камеры является защита. Оно защищает камеру от пыли, влаги и мусора, которые могут негативно повлиять на качество съемки или, в худшем случае, повредить модуль камеры.&nbsp;</p><hr/><p>Основные&nbsp;<strong>причины</strong>&nbsp;замены:</p><ul><li>царапины или трещины на стекле камеры;</li><li>нарушение герметичности (люфты и зазоры);</li><li>попадание влаги под стекло;</li><li>деформация или повреждения рамки стекла;</li><li>потеря стекла камеры.</li></ul><hr/><p><br/>В таком случае, не стоит пытаться самостоятельно чистить или доставать стекло, не имея опыта такой работы, подобные действия могут привести к повреждению корпуса, рамки камеры, или неработоспособности модуля камеры.</p><p>Обратитесь в сервисный центр нашего магазина, где наши сотрудники проведут диагностику устройства, сообщат вам о поломке и проконсультируют вас.</p>`, `
            <p><strong>{$prefix}&nbsp;{$brand_name}&nbsp;{$name}&nbsp;{$mod}.</strong></p><p><u><strong>Скло камери</strong></u>&nbsp;- зовнішня частина камери пристрою, яка не є складовою модуля камери, а кріпиться поверх модуля, також може бути частиною задньої кришки корпусу смартфона і виступати назовні. Основною функцією скла камери є захист. Воно перешкоджує потраплянню пилу, вологи і сміття, що може негативно вплинути на якість зйомки або, в гіршому випадку, пошкодити модуль камери.</p><hr/><div>Основні&nbsp;<strong>причини&nbsp;</strong>заміни:</div><div>&nbsp;</div><ul><li>подряпини або тріщини на склі камери;</li><li>порушення герметичності (люфти і зазори);</li><li>потрапляння вологи під скло;</li><li>деформація або пошкодження рамки скла;</li><li>втрата скла камери.</li></ul><hr/><p><br/>У такому випадку, не варто намагатися самостійно чистити або діставати скло, не маючи досвіду такої роботи, подібні дії можуть привести до пошкодження корпусу, рамки камери, або непрацездатності модуля камери.</p><p>Зверніться в сервісний центр нашого магазину, де наші співробітники проведуть діагностику пристрої, повідомлять вам про поломку і проконсультують вас.</p>
        `);
        const button_hover = new Template(`Кнопка (Home)`, 
            `<div> {$prefix} {$brand_name} {$name} {$mod} - одна из основных и наиболее часто взаимодействующих с владельцем деталей смартфона, что ускоряет появление царапин, потертостей и других неприятных визуальных или функциональных повреждений. У пользователей бывают случаи, когда накладка отваливалась и терялась, а также кнопка может западать или болтаться в отсутствии фиксации. Подобные признаки могут стать причиной замены. </div> <div> </div> <div> Если вы решили обратиться за помощью в наш магазин или сервисный центр, то вы получите помощь от опытных профессионалов, которые смогут определить точную причину поломки и проконсультировать при покупке нужной детали. Если вы имеете опыт в разборке уcтройств и починке мелких комплектующих, тогда можете провести замену самостоятельно.</div> `, 
            `<div> {$prefix} {$brand_name} {$name} {$mod} - одна з основних і найбільш часто взаємодіючих з власником деталей смартфона, що прискорює появу подряпин, потертостей та інших неприємних візуальних або функціональних пошкоджень. У користувачів бувають випадки, коли накладка відвалювалася і губилася, а також кнопка може западати або рухатися при відсутності фіксації. Подібні ознаки можуть стати причиною заміни.</div><div> &nbsp;</div><div> Якщо ви вирішили звернутися за допомогою в наш магазин або сервісний центр, то ви отримаєте допомогу від досвідчених професіоналів, які зможуть визначити точну причину поломки і проконсультувати при покупці потрібної деталі. Якщо ви маєте досвід в розбиранні пристроїв і лагодження дрібних комплектуючих, тоді можете провести заміну самостійно.</div>`);
        const vibro = new Template(`Вибромоторы`,
            `<div><span style=font-family:tahoma,geneva,sans-serif><u><strong>Вибромоторы</strong></u> - это внутренние компоненты смартфонов, которые передают свои колебания целиком всему телефону и в итоге мы получаем "вибрацию". Вибромоторы играют важную роль для пользователя устройства, так как при отсутствии звука они помагают буквально "почувствовать" важный звонок. Компоненты такого типа по своей сути являются маленькими двигателями, где одна из подвижных частей - вал, который имеет несбалансированный центр тяжести, что при циклическом движении и создает данное явление (вибрацию). Но высокая интенсивность такого циклического движения может постепенно вредить вибромотору или же всему устройству целиком.</span><br> </div><div><hr><p><br><span style=font-family:tahoma,geneva,sans-serif>Когда нужна <strong>замена </strong>или <strong>ремонт</strong> вибромотора:</span></div><ul><li><span style=font-family:tahoma,geneva,sans-serif>полное прекращение работы виброзвонка;</span><li><span style=font-family:tahoma,geneva,sans-serif>виброзвонок работает очень слабо;</span><li><span style=font-family:tahoma,geneva,sans-serif>телефон при звонках вибрирует не всегда;</span><li><span style=font-family:tahoma,geneva,sans-serif>зависание: вибрация не выключается и не прекращается при определенных условиях вплоть до полного выключения устройства.</span></ul><div> </div><div><span style=font-family:tahoma,geneva,sans-serif><strong>Причины </strong>неисправности компонента:</span></div><div> </div><ul><li><span style=font-family:tahoma,geneva,sans-serif>выход из строя элементов, которые питают вибромотор;</span><li><span style=font-family:tahoma,geneva,sans-serif>накопление мусора и пыли внутри устройства (вследствие - перегорание);</span><li><span style=font-family:tahoma,geneva,sans-serif>физические повреждения устройства или виброзвонка;</span><li><span style=font-family:tahoma,geneva,sans-serif>попадание жидкости;</span><li><span style=font-family:tahoma,geneva,sans-serif>программный сбой устройства.</span><br> </ul><div><hr><p><br><span style=font-family:tahoma,geneva,sans-serif>В таком случае, не стоит пытаться самостоятельно чинить данный компонент, не имея опыта такой работы, подобные действия могут привести к повреждению корпуса, самого компонента или платы, на которой тот распаян.</span></div><div><span style=font-family:tahoma,geneva,sans-serif>Обратитесь в наш магазин или сервис, где наши сотрудники проведут диагностику устройства, сообщат вам о поломке и помогут выбрать в магазине нужную деталь, а также проконсультируют вас.</span></div>
        `,
            `<div><u><strong>Вібромотори</strong></u> - це внутрішні компоненти смартфонів, які передають свої коливання цілком всьому телефону і в підсумку ми отримуємо "вібрацію". Вібромотор грають важливу роль для користувача пристроїв, так як при відсутності звуку вони допомагають буквально "відчути" важливий дзвінок. Компоненти такого типу за принципом роботи є маленькими двигунами, де одна з рухомих частин - вал, який має незбалансований центр ваги, що при циклічному русі і створює дане явище (вібрацію). Але висока інтенсивність такого циклічного руху може поступово шкодити вібромотору або ж всьому пристрою цілком.<br><br><hr><p><br>Коли потрібна <strong>заміна </strong>або <strong>ремонт </strong>вібромотора:</div><ul><li>повне припинення роботи вібродзвінка;<li>вібро працює дуже слабо;<li>телефон при дзвінках вібрує не завжди;<li>зависання: вібрація не вимикається і не припиняється при певних умовах аж до повного виключення пристрою.</ul><div> </div><div><strong>Причини </strong>несправності компонента:<br> </div><ul><li>вихід з ладу елементів, які живлять вібромотор;<li>накопичення сміття і пилу всередині пристрою (внаслідок - перегорання);<li>фізичні ушкодження пристрою або вібродзвінка;<li>потрапляння рідини;<li>програмний збій пристрою.<br><br><hr><p><br>В такому випадку, не варто намагатися самостійно лагодити даний компонент, не маючи досвіду такої роботи, подібні дії можуть привести до пошкодження корпусу, самого компонента або плати, на якій той розпаяний.</ul><div>Зверніться в сервісний центр нашого магазину, де наші співробітники проведуть діагностику пристрої, повідомлять вам про поломку і проконсультують вас.</div>
        `);
        const vinty = new Template(`Винты`,`<div style="text-align:justify;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#363636"><p><span style=font-family:tahoma,geneva,sans-serif><strong>{$prefix} </strong><strong>{$brand_name} </strong><strong>{$name} </strong><strong>{$mod}.</strong></span><p><span style=font-family:tahoma,geneva,sans-serif><u><strong>Винты</strong></u><strong> </strong>для смартфонов - это мельчайшие крепежные составляющие вашего корпуса и внутренних копмлектующих.<br>Подобные детали очень просто потерять или повредить. Каждый винт может отличаться диаметром и размерами, а также материалом и разновидностью <i>шлица</i>.<br>Шлиц — это форма углубления в головке винта, например: крест, прямой, шестигранный, плоский и т.д.</span></p><img alt=""src=https://home.aks.ua/userfiles/images/shlits(2).png style=font-family:tahoma,geneva,sans-serif;width:600px;height:126px><hr color=#CACACA noshade size=1px width=100%><br><p><span style=font-family:tahoma,geneva,sans-serif><strong>Признаки</strong>, которые могут стать причиной замены винтов:</span><ul style=list-style-position:inside;margin-left:1em;margin-right:1em type=circle><li><span style=font-family:tahoma,geneva,sans-serif>потеря винтов при разборке / сборке устройства;</span><li><span style=font-family:tahoma,geneva,sans-serif>повреждения резьбы винта;</span><li><span style=font-family:tahoma,geneva,sans-serif>сорванная шляпка винта;</span><li><span style=font-family:tahoma,geneva,sans-serif>стертое углубление на шляпке винта;</span><li><span style=font-family:tahoma,geneva,sans-serif>негерметичность корпуса устройства (люфты, зазоры, поскрипывания);</span><li><span style=font-family:tahoma,geneva,sans-serif>плохо закрепленные внутренние копмлектующие устройства.</span></ul><br><hr color=#CACACA noshade size=1px width=100%><p><span style=font-family:tahoma,geneva,sans-serif>Все выше перечисленные пункты вызывают не только раздражение пользователя устройства, но и могут стать причиной попадания большого количества пыли и влаги под корпус и на внутренние комплектующие устройства, что в свою очередь, приводит к быстрому выведению из строя внутренних компонентов, повреждению корпуса и порче внешнего вида смартфона.</span><p><span style=font-family:tahoma,geneva,sans-serif>Чтобы избежать подобных проблем, вы можете обратиться в наш сервис, где получите необходимые рекомендации. Также, при наличии опыта и спец. инструментов, вы можете заменить винты или другие детали самостоятельно, прежде заказав товар в нашем магазине</span></div><p> 
        `, `
        <div style="text-align:justify;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#363636"><p><span style=font-family:tahoma,geneva,sans-serif><strong>{$prefix} </strong><strong>{$brand_name} </strong><strong>{$name} </strong><strong>{$mod}.</strong></span><p><span style=font-family:tahoma,geneva,sans-serif><u><strong>Гвинти</strong></u><strong> </strong>для смартфонів – це наймілкіші кріпильні складові вашого корпусу та внутрішніх комплектуючих.<br>Подібні деталі дуже просто загубити або пошкодити. Кожен гвинтик може відрізнятися діаметром і розмірами, а також матеріалом і різновидом <i>шліца</i>.<br>Шліц — це форма заглиблення в голівці болта, наприклад: хрест, прямий, шестигранний, плоский і т.д.</span><p><span style=font-family:tahoma,geneva,sans-serif><img alt=""src=/userfiles/images/shlits(2).png style=width:600px;height:126px></span><hr color=#CACACA noshade size=1px width=100%><p><span style=font-family:tahoma,geneva,sans-serif>  <strong>Ознаки</strong>, які можуть стати причиною заміни гвинтів:</span><ul style=list-style-position:inside;margin-left:1em;margin-right:1em type=circle><li><span style=font-family:tahoma,geneva,sans-serif>втрата або потрапляння в важкодоступні місця гвинтів при розбиранні / збиранні пристрою;</span><li><span style=font-family:tahoma,geneva,sans-serif>пошкодження різьби гвинта;</span><li><span style=font-family:tahoma,geneva,sans-serif>зірвана голівка гвинта;</span><li><span style=font-family:tahoma,geneva,sans-serif>стерте заглиблення на голівці гвинтика;</span><li><span style=font-family:tahoma,geneva,sans-serif>негерметичність корпусу пристрою (люфти, зазори, поскрипування);</span><li><span style=font-family:tahoma,geneva,sans-serif>погано закріплені внутрішні комплектуючі пристрої.</span></ul><br><hr color=#CACACA noshade size=1px width=100%><p><span style=font-family:tahoma,geneva,sans-serif>Всі вище перераховані пункти викликають не тільки роздратування власника пристрою, але і можуть стати причиною потрапляння великої кількості пилу і вологи під корпус і на внутрішні комплектуючі пристрої, що в свою чергу, призводить до швидкого виведення з ладу внутрішніх компонентів, пошкодження корпусу і псування зовнішнього вигляду смартфона.</span><p><span style=font-family:tahoma,geneva,sans-serif>Щоб уникнути подібних проблем, ви можете звернутися в наш сервіс, де отримаєте необхідні рекомендації. Також, при наявності досвіду і спеціальних інструментів, ви можете замінити болти або інші деталі самостійно, попередньо замовивши товар у нашому магазині.</span></div><p> 
        `);
        const test = new Template(`TEST`,`{123|213|321}`, `{123|213|321}`);

        })();
        

        // показати весь плагін
        dos_openButton.onclick = function () {
            
            if (!(dos_list_wrapper.classList.contains('dos_list_wrapper'))) {
                this.value = "Спрятать";
                dos_list_wrapper.classList.toggle('dos_list_wrapper')
                dos_wrapper.style.height = "100%";
            } else {
                this.value = "Показать";
                dos_wrapper.style.height = "49px";
                dos_list_wrapper.classList.toggle('dos_list_wrapper');
            };
        };

        // марафон по LocalStorage з перевіркою існуючих шаблонів
        // (function getFromLocalStorage () {
        //     for (const key in localStorage) {
        //         if(localStorage.getItem(key) !== null){
        //             console.log(localStorage.getItem(key))
        //             dos_templates_options.append(JSON.parse())
        //         }
                
        //     }

        // })();
        


        // вставити в поля для прев'ю
        dos_templates_options.onchange = function () {
            textareas.forEach(el => {
                el.readOnly = true;
            });
            dos_preview_area_ru.textContent = arr[this.selectedIndex - 1].ru;
            dos_preview_area_ua.textContent = arr[this.selectedIndex - 1].ua;
        };


        // чистка тизерів по кнопці та для вставки в основні поля
        dos_paste_button.onclick = function () {
			
			
			teasers_ru.value = '';
			teasers_uk.value = '';
			
            dos_target_area_ru = document.querySelectorAll("iframe")[0].contentDocument.body;
            dos_target_area_ua = document.querySelectorAll("iframe")[1].contentDocument.body;
            dos_target_area_ru.innerHTML = dos_preview_area_ru.textContent;
            dos_target_area_ua.innerHTML = dos_preview_area_ua.textContent;

        };

        // для переключення стану додавання (відміна чи ні)
        function toggleStateOfCreating (isActive, valueOfPlaceholder){
            [dos_preview_area_ru, dos_preview_area_ua].forEach(el=>{
                el.textContent = '';
                el.readOnly = isActive;
                el.placeholder = valueOfPlaceholder;
            });
            dos_add_new_option.disabled = !(isActive);
        };
        var labelOfTemplate = "";
        // для створення шаблону через інтерфейс плагіну
        dos_add_new_option.onclick = function (event) {
            labelOfTemplate = prompt("Введите название категории/подкатегории: ");
            if (labelOfTemplate == "" || labelOfTemplate == null){
                dos_preview_area_ru.innerHTML = "";
                dos_preview_area_ua.innerHTML = "";
            } else {
                if(event){
                    dos_saveButton.className = "dos_buttons";
                    dos_cancelButton.className = "dos_buttons";
                    dos_cancelButton.style.marginTop = "10px";
                    dos_list_wrapper.append(dos_saveButton);
                    dos_list_wrapper.append(dos_cancelButton);
                    
                    toggleStateOfCreating(false, "Вставьте шаблон описание в формате HTML");
                    
                };
            };
        
        };

        // для відміни додавання шаблону
        dos_cancelButton.onclick = function () {
            toggleStateOfCreating(true, "Только для чтения...");
            [this, this.previousElementSibling].forEach(e => e.classList.toggle("dos_list_wrapper_unactive"));
        };

        // зберігаємо шаблон в LocalStorage з ключом
        dos_saveButton.onclick = function(){
            [this, this.nextElementSibling].forEach(e => e.classList.toggle("dos_list_wrapper_unactive"));
            toggleStateOfCreating(true, "Только для чтения...");
            localStorage.setItem(labelOfTemplate, JSON.stringify(new Template(`${labelOfTemplate}` ,dos_preview_area_ru.value, dos_preview_area_ua.value)) );

            
        };

        

        
        // для повернення в поля початкового тексту
        dos_reset_button.onclick = setStateToAreas;
        
        // для автоматичного відкриття
        dos_openButton.click();

    };

    
    _dos_template_start();
}, 200);
