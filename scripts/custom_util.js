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

function get_projects_list(){

    main_div = d3.select('#projects_list')

    d3.csv('data/project_info.csv', function(data){

        for (var i = 0; i < data.length; i++) {
            back = main_div.append('div')
                            .attr('class','project_back')
                            .append('a')
                            .attr('href','#')
                            .attr('class','project_card_click')
                            .attr('onclick','project_card_pop_up('+i+')')

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
            console.log(data[i]['project-image'])
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

    d3.csv('data/project_info.csv', function(data){
        d3.select("#project_popup_title")
            .html(data[project_id]['name']);
        d3.select("#project_popup_info")
            .html(data[project_id]['description']);
        d3.select("#project_popup_tags")
            .html(data[project_id]['expertise']);
        d3.select("#project_popup_dates")
            .html(data[project_id]['time']);
        d3.select("#project_popup_video")
            .attr('src',data[project_id]['youtube-link']);

    })
}

function project_card_pop_up_close(){
    d3.select('#project_popup_overlay')
        .style('visibility','hidden')
        .style('opacity','0');
}

function get_articles_list(){

    main_div = d3.select('#articles_list')

    d3.csv('data/article_info.csv', function(data){
        for (var i = 0; i < data.length; i++) {
            back = main_div.append('a')
                            .attr('href',data[i]['article-link'])
                            .attr('target','_blank')
                            .append('div')
                            .attr('class','project_back')

            // add all the info together
            info_items = {
                'project_name': 'name',
                'project_meta-info': 'meta-info'
            }

            for(var key in info_items){
                back.append('div')
                    .text(data[i][info_items[key]])
                    .attr('class',key)
            }

            back.append('img')
                .attr('src', data[i]['project-image'])
                .attr('class','project_main_image')

        }

        // limit the string to specific number of substrings
        d3.selectAll('.project_name').each(function() {
            const html = d3.select(this).html();
            console.log(html);
            d3.select(this).html(html.substring(0, 58) + '...');
        });

    });

}