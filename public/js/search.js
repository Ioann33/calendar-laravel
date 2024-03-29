let searchForm = document.forms.searchEvent;

async function deleteEvent(id){



    let values = document.querySelectorAll(`#event${id} input`);

        const res = await fetch(`http://first-calendar.local/api/calendar/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer csdajk5hjcbe324jilndlwknj2bsdcs',
            }
        });
        const data = await res;
        if (data.status === 405){
            alert('this action is not authorizated');
        }
        if (data.status === 200){
            alert('success delete');
            document.getElementById(`event${id}`).remove();
        }
    if (data.status === 400){
        alert('you cannot change this events , to start left less thee hours or event completed');
    }




}

async function updateEvent(id) {

    let values = document.querySelectorAll(`#event${id} input`);

        let resArr = [
            values[0].value,
            values[1].value,
            values[2].value,
            values[3].value,
            values[4].value,
        ];
        const res = await fetch(`http://first-calendar.local/api/calendar/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer csdajk5hjcbe324jilndlwknj2bsdcs',
            },
            body: JSON.stringify(resArr),
        });

        const data = await res;

        if (data.status === 200){
            alert('success');
            searchForm.onsubmit();
        }
        if (data.status === 405){
            alert('this action is not authorizated');
        }
        if (data.status === 400){
            alert('you cannot change this events , to start left less thee hours or event completed');
        }




}


function eventsToHtml(events){
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    for (let key in events){
        contentDiv.insertAdjacentHTML('beforeend',`
                        <div id="event${events[key].id}">
                            <label>Data:
                            <input type="date" name="date" value="${events[key].date}">
                        </label>
                        <label>Start at:
                            <input type="time" name="start" value="${events[key].start_at}">
                        </label>
                        <label>Finish at:
                            <input type="time" name="finish" value="${events[key].finish_at}">
                        </label>
                        <label>Title:
                            <input type="text" name="title" value="${events[key].title}">
                        </label>
                        <label>Description:
                            <input type="text" name="description" value="${events[key].description}">
                        </label>
                        <input type="hidden" name="dateHidd" value="${events[key].date}">
                        <input type="hidden" name="startHidd" value="${events[key].start_at}">
                        <button onclick="updateEvent(${events[key].id})" class="update-btn" name="create-btn" type="button" class="btn btn-info"><i class="fa fa-plus"></i> Update </button>
                        <button onclick="deleteEvent(${events[key].id})" class="delete-btn" name="delete-btn" type="button" class="btn btn-info"><i class="fa fa-trash"></i> Delete </button>
                        </div>
                    `);
    }
}


searchForm.onsubmit = function (e) {

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
            if (xhr.status ===200){
                let jsonEvents = xhr.responseText;
                let events = JSON.parse(jsonEvents);
                eventsToHtml(events);
            }else {
                alert('Some problem with request');
                console.error('request of all articles are failed with status' + xhr.status+' '+xhr.statusText)
            }
        }
    }
    let method = this.method;
    let first = this.dateStart.value;
    let second = this.dateFinish.value;


    xhr.open(method, `http://first-calendar.local/api/calendar/?first=${first}&second=${second}`);
    xhr.setRequestHeader('Authorization', 'Bearer csdajk5hjcbe324jilndlwknj2bsdcs');
    xhr.send();

    e.preventDefault();
}

