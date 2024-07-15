const get_blog_posts = async () => {

    url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRIYnNipLnXtyxELbY9YLnH_FrhZbkG2trccjfCbs_T9QRP1H1xxQbGhVFKrhJLT97xNazFE7WvuXWy/pub?gid=0&single=true&output=csv";
    data = await d3.csv(url, d3.autotype);

    // filter data in descending order
    data = data.slice().sort((a,b) => d3.descending(a.date, b.date));

    main_div = d3.select('#blogpost_list');

    for (var i = 0; i < data.length; i++) {
        back = main_div.append('div').attr('class','blogpost_back')

        // add the image
        back.append('img')
            .attr('src', data[i]['picture_url'])
            .attr('class', 'blogpost_image')
        
        
        
        back = back.append('div').attr('class','blogpost_content')

        // add the log title
        back.append('div')
                .attr('class','blogpost_title')
                .html("Log " + String(data[i]['log_no']).padStart(2, '0') + ": " + data[i]['title']);

        // date to it
        back.append('div')
                .attr('class','blogpost_date')
                .html(data[i]['date']);

        // add the notion for the post
        temp = back.append('div')
                .attr('class','blogpost_notion');

        data[i]['notion'].split('|').forEach(para => {
            temp.append('p')
                .attr('class','blogpost_notion_para')
                .html(para.trim());
        });

        // for (var i = 0; i < convert_notion_gsheet(data[i]['notion']); i++) {
        //         // console.log(data[i]['notion']);
        //         console.log(convert_notion_gsheet(data[i]['notion']));
        // }
        
    }

};

function convert_notion_gsheet(notion){
    // split on '-' for paragraphs
    temp = notion.split('-');

    return temp
}