var taskList={
    tasks:[],
    addTask:function(taskName,date){
        this.tasks.push({
            taskName:taskName,
            date:date,
            taskStatus:false,
        });        
    },
   
    toggleAllTaskStatus:function(){
        var taskCount=this.tasks.length;
        var totalCompleteTask=0;
        for(let i=0;i<taskCount;i++){
            if(this.tasks[i].taskStatus===true){
                totalCompleteTask++;
            }
        }
        if(totalCompleteTask===taskCount){
            for(let j=0;j<taskCount;j++){
                this.tasks[j].taskStatus=false;
            }
        }else{
            for(let k=0;k<taskCount;k++){
                this.tasks[k].taskStatus=true;
            }
        }
       
    },
    
    deleteTask:function(position){
        taskList.tasks.splice(position,1);
    },
    changeTaskStatus:function(position){
        taskList.tasks[position].taskStatus=!taskList.tasks[position].taskStatus;
    }
};

var handler= {
    addTaskHandler: function(){
        taskName=document.getElementById('taskName');
        date=document.getElementById('date');
        taskList.addTask(taskName.value,date.value);
        view.displayTask();        
    },
    
    toggleAllTaskHandler:function(){
        taskList.toggleAllTaskStatus();
         view.displayTask();
    },
    deleteTaskHandler:function(){
        let checkboxes=document.getElementsByName('checkbox');
        for(let i=checkboxes.length-1;i>=0;i--){
            if(checkboxes[i].checked){
                console.log(checkboxes[i].id);
                taskList.deleteTask(checkboxes[i].id);
            }
        }
        
        view.displayTask();
    },
    changeStatus:function(){
        let checkboxes=document.getElementsByName('checkbox');
         for(let i=0;i<checkboxes.length;i++){
            if(checkboxes[i].checked){
                console.log(checkboxes[i].id);
                taskList.changeTaskStatus(checkboxes[i].id);
            }
        }
         view.displayTask();
    },
    filterTasks:function(value){
        if(value==2){
            view.listAllInProgressTask();
        }
        if(value==3){
            view.listAllCompleteTask();
        }
        if(value==1){
            view.displayTask();
        }
    }
};

var view={
    displayTask:function(){
        var taskTable=document.querySelector('table');
        taskTable.innerHTML='';
        taskTable=this.createHeadForTable(taskTable);
        
        var taskCount=taskList.tasks.length;
        for(let i=0;i<taskCount;i++){
            tr=document.createElement('tr');
            tr.id=i;
            td1=document.createElement('td');
            td1.append(this.createCheckBox(i));
            td2=document.createElement('td');
            td2.textContent=taskList.tasks[i].taskName;
            td3=document.createElement('td');
            td3.textContent=taskList.tasks[i].date;
            td4=document.createElement('td');
            if(taskList.tasks[i].taskStatus){
                 td4.textContent='Completed';
             }else{
                 td4.textContent='In progress';
             }
             
             tr.append(td1);
             tr.append(td2);
             tr.append(td3);
             tr.append(td4);
            
             taskTable.appendChild(tr);  
        }  
     },
    createHeadForTable:function(taskTable){
        tableHead=document.createElement('tr');
        headSelectAll=document.createElement('th');
        headSelectAll.textContent="Select All";
        headTaskName=document.createElement('th');
        headTaskName.textContent="Title";
        headDate=document.createElement('th');
        headDate.textContent="Due Date";
        headStatus=document.createElement('th');
        headStatus.textContent=" Completion Status";
        tableHead.append(headSelectAll);
        tableHead.append(headTaskName);
        tableHead.append(headDate);
        tableHead.append(headStatus);
        taskTable.appendChild(tableHead);
        return taskTable;
    },
    
    createCheckBox:function(i){
        checkbox=document.createElement('INPUT');
        checkbox.type='checkbox';
        checkbox.name='checkbox';
        checkbox.id=i;
        return checkbox;
    },
    
    listAllCompleteTask:function(){
         var taskTable=document.querySelector('table');
        taskTable.innerHTML='';
        taskTable=this.createHeadForTable(taskTable);
        var taskCount=taskList.tasks.length;
        for(let i=0;i<taskCount;i++){
            if(taskList.tasks[i].taskStatus){
            tr=document.createElement('tr');
            tr.id=i;
            td1=document.createElement('td');
            td1.append(this.createCheckBox(i));
            td2=document.createElement('td');
            td2.textContent=taskList.tasks[i].taskName;
            td3=document.createElement('td');
            td3.textContent=taskList.tasks[i].date;
            td4=document.createElement('td');
            td4.textContent='Completed';
             tr.append(td1);
             tr.append(td2);
             tr.append(td3);
             tr.append(td4);
            
             taskTable.appendChild(tr);    
            }
              
        }  
    },
    
    listAllInProgressTask:function(){
         var taskTable=document.querySelector('table');
        taskTable.innerHTML='';
        taskTable=this.createHeadForTable(taskTable);
        var taskCount=taskList.tasks.length;
        for(let i=0;i<taskCount;i++){
            if(!taskList.tasks[i].taskStatus){
            tr=document.createElement('tr');
            tr.id=i;
            td1=document.createElement('td');
            td1.append(this.createCheckBox(i));
            td2=document.createElement('td');
            td2.textContent=taskList.tasks[i].taskName;
            td3=document.createElement('td');
            td3.textContent=taskList.tasks[i].date;
            td4=document.createElement('td');
            td4.textContent='In Progress';
             tr.append(td1);
             tr.append(td2);
             tr.append(td3);
             tr.append(td4);
            
             taskTable.appendChild(tr);    
            }
              
        }  
    }
    
    
};