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

    d3.csv('project_info.csv', function(data){
        for (var i = 0; i < data.length; i++) {
            back = main_div.append('div')
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

            console.log(data[i]['project-image'])
            back.append('img')
                .attr('src', data[i]['project-image'])
                .attr('class','project_main_image')

        }
    });

    

}