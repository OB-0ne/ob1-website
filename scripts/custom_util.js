let data_projects = [];

function get_projects_list_old(){

    main_div = d3.select('#projects_list')

    d3.csv('project_info.csv', function(data){
        for (var i = 0; i < data.length; i++) {
            back = main_div.append('div')
                            .attr('class','project_back')

            // add all the info together
            info_items = {
                'project_name': 'name',
                'project_meta-info': 'meta-info',
                'project_time': 'time',
                'project_description': 'description'
            }

            for(var key in info_items){
                back.append('div')
                    .text(data[i][info_items[key]])
                    .attr('class',key)
            }

            // add all the project links together
            if(data[i]['github-link']){
                back.append('a')
                    .attr('href', data[i]['github-link'])
                    .attr('target','_blank')
                    .append('img')
                    .attr('src','https://cdn3.iconfinder.com/data/icons/popular-services-brands/512/github-512.png')
                    .attr('class','project_link_icon')
            }

            if(data[i]['youtube-link']){
                back.append('a')
                    .attr('href', data[i]['youtube-link'])
                    .attr('target','_blank')
                    .append('img')
                    .attr('src','https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Youtube_colored_svg-512.png')
                    .attr('class','project_link_icon')
            }

        }
    });

    

}

async function get_projects_list(){

    main_div = d3.select('#projects_list');
    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRd7qBHpvC7wd0fbigPMTlYlF7LIHpRK03ZkmGr4PkP0ASmTZLYZuAhU32Df2-Q-9mpjjwYNSF0QIUv/pub?gid=1447634970&single=true&output=csv";

    d3.csv(url,function(data){
        
        // store in a local variable for any further interaction
        data_projects = data;

        // show all the projects as a list
        for (var i = 0; i < data.length; i++) {
            back = main_div.append('div')
                            .attr('class','project_back')
                            .append('a')
                            .attr('href','#')
                            .attr('class','project_card_click')
                            .attr('onclick','project_card_pop_up('+data[i]['id']+')');
    
            // add all the info together
            info_items = {
                'project_name': 'name',
                'project_meta-info': 'meta-info'                
            }
    
            // add the title and meta info to to the card
            for(var key in info_items){
                back.append('div')
                    .text(data[i][info_items[key]])
                    .attr('class',key)
            }
    
            // add the image tot he card
            back.append('img')
                .attr('src', data[i]['project-image'])
                .attr('class','project_main_image')
    
        }
    });
    

}

function project_card_pop_up(project_id){
    
    d3.select('#project_popup_overlay')
        .style('visibility','visible')
        .style('opacity','1');

    // update the pop-up UI with details
    d3.select("#project_popup_title")
        .html(data_projects[project_id]['name']);
    d3.select("#project_popup_info")
        .html(data_projects[project_id]['description']);
    // conditionally add github link when available
    if(data_projects[project_id]['github-link'] != '-' && data_projects[project_id]['github-link'] != ''){
        d3.select("#project_popup_git")
            .html('Github: <a target="_blank" href="' + data_projects[project_id]['github-link'] + '">'+ data_projects[project_id]['github-link'] + '</a>');
    }   
    d3.select("#project_popup_tags")
        .html(data_projects[project_id]['expertise']);
    d3.select("#project_popup_dates")
        .html(data_projects[project_id]['time']);
    
    // conditionally add an iframe for video when available
    if(data_projects[project_id]['youtube-link'] != '-' && data_projects[project_id]['youtube-link'] != ''){
        d3.select("#project_popup_video")
            .style('display','');
        d3.select("#project_popup_video")
            .attr('src',data_projects[project_id]['youtube-link']);
    }
    else{
        d3.select("#project_popup_video")
            .style('display','none');
    }
    
}

function project_card_pop_up_close(){
    
    // his the pop-up UI
    d3.select('#project_popup_overlay')
        .style('visibility','hidden')
        .style('opacity','0');

    // remove all info from the UI and reset it
    d3.select("#project_popup_title")
        .html("Title");
    d3.select("#project_popup_info")
        .html("Lorem Ipsum...");
    d3.select("#project_popup_git")
        .html('');
    d3.select("#project_popup_tags")
        .html('');
    d3.select("#project_popup_dates")
        .html('');
    d3.select("#project_popup_video")
        .attr('src','');
}

function get_articles_list() {

    main_div = d3.select('#articles_list')
    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vThEd3Wan8qTsW6Ud5yVVNzxRsdMEK0DdQXQ-Rdy7S85zP2NxwBznKIECom5-m2h3WBoM4Ekxba7wau/pub?gid=1838937648&single=true&output=csv";

    d3.csv(url, function (data) {
        for (var i = 0; i < data.length; i++) {
            back = main_div.append('a')
                .attr('href', data[i]['article-link'])
                .attr('target', '_blank')
                .append('div')
                .attr('class', 'project_back')

            // add all the info together
            info_items = {
                'project_name': 'name',
                'project_meta-info': 'meta-info'
            }

            for (var key in info_items) {
                back.append('div')
                    .text(data[i][info_items[key]])
                    .attr('class', key)
            }

            back.append('img')
                .attr('src', data[i]['project-image'])
                .attr('class', 'project_main_image')

        }

        // limit the string to specific number of substrings
        d3.selectAll('.project_name').each(function () {
            const html = d3.select(this).html();
            d3.select(this).html(html.substring(0, 58) + '...');
        });

    });

}