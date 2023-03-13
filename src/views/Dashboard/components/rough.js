MachineNo.map(
    (machine, index) => {
        const ref = collection(db_firestore, collection_name);
        const q = query(ref,
            // where('unix_time', '>=', Math.floor(startDate.getTime() / 1000)),
            where('unix_time', '<=', Math.floor(endDate.getTime() / 1000)),
            where('machine_no', '==', machine),
            orderBy('unix_time', 'desc'),
            limit(1)
        );
        getDocs(q).then(
            (snapShot) => {
                let count = 0;
                let Weight = 0;

                snapShot.forEach((doc) => {
                    count += parseFloat(doc.data()['count']);
                    Weight += parseFloat(doc.data()['weight']);
                    // console.log(doc.data());
                });
                graphDataArr.push({
                    name: machine,
                    Pipes: count,
                    'Total weight': Weight,
                    'Average Pipe Weight': (Weight / count).toFixed(2)
                });

                // Set data if the loop will complete and Array is fully pushed
                if (MachineNo.length === index + 1) {
                    setGraphData(graphDataArr);
                }
            }
        );
    }
);