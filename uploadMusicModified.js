UploadSongs.addEventListener('click',function(e){
console.log(e);
console.log(e.target.parentElement.firstElementChild.firstElementChild.nodeName);
	for(i = 0 ; i<e.target.parentElement.firstElementChild.firstElementChild.files.length ;i++){

		var audioFile = e.target.parentElement.firstElementChild.firstElementChild.files[i];
//firebase.auth().currentUser
		var storageRef = firebase.storage().ref( "/"+audioFile.name);

		var task = storageRef.put(audioFile);

		task.on('state_changed',function progress(snapshot){

			var percentage = snapshot.bytesTransferred / snapshot.totalBytes *100;

			//console.log("Upload is "+ percentage+ " %done");
			console.log("FILE:"+"fileUploadProgress"+audioFile.name+"PERCENT: "+percentage);
			document.getElementById("FileUploadProgress").value=percentage;
			switch(snapshot.state){
				case firebase.storage.TaskState.PAUSED :
				console.log("Upload is Paused ");
				break;

				case firebase.storage.TaskState.RUNNING :
				console.log("Upload is Running ");
				break;

			}
		})
	}
});

