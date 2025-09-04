let data_projects = [];
let group_by = 'none';

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

// A new function to group the available data by groups and updating the UI.
// Each new group will have a header and projects card will load under them
// in a new dispatchEvent. Needs a custom function to handle UI changes, which
// is applied to the title paragraph.
async function get_projects_list_byType(){

    var filtered_list;

    // select the current project div and empty it
    main_div = d3.select('#projects_list');
    main_div.html("");
  
    if(data_projects.length>0){

        // get all unique group types
        let uniqueTypes = [...new Set(data_projects.map(d => d['group-type']))]; 
        
        // add a new div with header name for each of the types
        for (var i = 0; i < uniqueTypes.length; i++){

            // add a new div for each type with a unique id
            project_group = main_div.append('div')
                            .attr('id','projectType_'+ uniqueTypes[i]);

            // add a divider to start with
            project_group.append('hr');

            // add a paragraph to show title, which will also have a function
            // which takes care of UI arrow changes to open and collapse for
            // the project cards
            project_group.append('p')
                    .html('<i class="arrow arrow-right"></i>   ' + uniqueTypes[i])
                    .attr('class','project-list-group-title')
                    .on('click', function(){

                        var parent_div = this.parentNode;
                        // parent will be used to hide/unhide project cards
                        console.log(parent_div);
                        console.log(d3.select(parent_div).selectAll('.project_back'));

                        if(this.children[0].className.split(' ').includes('arrow-right')){
                            // change the arrow in the title
                            this.children[0].classList.remove('arrow-right');
                            this.children[0].classList.add('arrow-down');

                            // show all the cards
                            d3.select(parent_div)
                                .selectAll('.project_back')
                                .style('display','');
                        }
                        else{
                            // change the arrow in the title
                            this.children[0].classList.add('arrow-right');
                            this.children[0].classList.remove('arrow-down');

                            // show all the cards
                            d3.select(parent_div)
                                .selectAll('.project_back')
                                .style('display','none');
                        }
                    });        

            // filter the data for the current type
            filtered_list = data_projects.filter(function(d){ return d['group-type']==uniqueTypes[i]});

            // loop on the projects to generate their projects cards
            for (var j = 0; j < filtered_list.length; j++) {

                // making the background of project card - main background div
                back = project_group.append('div')
                                .attr('class','project_back')
                                .append('a')
                                .attr('href','#')
                                .attr('class','project_card_click')
                                .attr('onclick','project_card_pop_up('+filtered_list[j]['id']+')');

                // add all the info together
                info_items = {
                    'project_name': 'name',
                    'project_meta-info': 'meta-info'                
                }
        
                // add the title and meta info to to the card
                for(var key in info_items){
                    back.append('div')
                        .text(filtered_list[j][info_items[key]])
                        .attr('class',key);
                }
        
                // add the image tot he card
                back.append('img')
                    .attr('src', filtered_list[j]['project-image'])
                    .attr('class','project_main_image');
            }
        }
        // hide all project cards by default
        d3.selectAll('.project_back')
            .style('display','none');
            
        // add another diver at the end for consistent UI
        project_group.append('hr');
    }
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