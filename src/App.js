import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount, useContract, useSigner } from 'wagmi';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './contract';

function App() {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    signerOrProvider: signer
  });
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    try {
      let tasks = []
      let tasksCount = await contract.count();
      if (tasksCount) {
        tasksCount = (+tasksCount);
        for (let i = 0; i < tasksCount; i++) {
          const task = await contract.tasks(i);
          if (task) {
            tasks.push(task)
          }
        }
        setTasks(tasks);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addNewTask = async () => {
    try {
      setLoading(true);
      const newTask = await contract.addTask(inputTask)
      // console.log(newTask);
      await newTask.wait();
      setTasks(prev => [...prev, [inputTask, false]]);
      setInputTask(null);
      setLoading(false);
      document.getElementById('input-task').value = "";
      return true;
    } catch (err) {
      console.log(err);
      alert(err.reason);
      setLoading(false);
    }
  }

  const completeTask = async (task) => {
    try {
      setLoading(true);
      const taskIndex = tasks.findIndex(a => a[0] === task)
      // console.log("index ", taskIndex)
      const completeTask = await contract.completeTask(taskIndex)
      // console.log(completeTask)
      let res = await completeTask.wait()
      const newTasks = tasks.filter(a => a[0] !== task)
      // console.log(newTasks)
      setTasks(newTasks);
      setLoading(false);
      return true;
    } catch (err) {
      console.log(err);
      setLoading(false);
      return false;
    }
  }

  useEffect(() => {
    if (contract) {
      getTasks();
    }
  }, [contract]);

  return (
    <div className="flex flex-col justify-center items-center bg-black text-white">
      <div className="flex items-center justify-between w-full px-4 py-2">
        <p className="text-xl font-bold">Todo-List</p>
        {address && <ConnectButton />}
      </div>
      <div
        style={{ minHeight: "95vh" }}
        className="flex flex-col items-center justify-center gap-4 w-full"
      >
        <h1 className="text-4xl font-extrabold mb-10">Tasks</h1>

        {!address && <ConnectButton />}

        <div className="flex flex-row items-center justify-center gap-4">
          <input id='input-task' onChange={(e) => setInputTask(e.target.value)} className="px-4 py-2 rounded-xl text-black outline-none" placeholder="Add a task..." />
          <button onClick={addNewTask} className={`px-4 py-2 rounded-xl border border-green-400 ${loading ? 'bg-gray-400 cursor-not-allowed ' :'bg-white'} text-black transform hover:scale-105`} disabled={loading}>Add Task</button>
        </div>

        <div className="flex items-center justify-center flex-col">
          {tasks.length > 0 &&
            tasks.map((taskItem, i) => {
              return (
                <div className="w-full" key={i}>
                  {
                    !taskItem[1] && (
                      <div className="flex items-center gap-3 py-2">
                        <div class="flex items-center">
                          <input id="default-checkbox" onChange={async (e) => {
                            if (e.target.checked) {
                              let result = await completeTask(taskItem[0]);
                              result ? await getTasks() : e.target.checked = false;
                            }
                          }} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" disabled={loading} />
                        </div>
                        <h2 className="text-xl">{taskItem[0]}</h2>
                        <p className="text-lg float-right text-green-500	">
                          {new Date(taskItem[2].toNumber() * 1000).toDateString()}&nbsp;&nbsp;
                          {new Date(taskItem[2].toNumber() * 1000).getHours()}:{new Date(taskItem[2].toNumber() * 1000).getMinutes()}:{new Date(taskItem[2].toNumber() * 1000).getSeconds()}
                        </p>
                      </div>
                    )
                  }
                </div>
              );
            })}

          {tasks.length > 0 &&
            tasks.reverse().map((taskItem, i) => {
              return (
                <div className="w-full" key={i}>
                  {
                    taskItem[1] && (
                      <div className="flex items-center gap-3 py-2">
                        <h2 className="text-xl line-through text-gray-400">{taskItem[0]}</h2>
                        <p className="text-lg float-right text-gray-400">
                          {new Date(taskItem[2].toNumber() * 1000).toDateString()}&nbsp;&nbsp;
                          {new Date(taskItem[2].toNumber() * 1000).getHours()}:{new Date(taskItem[2].toNumber() * 1000).getMinutes()}:{new Date(taskItem[2].toNumber() * 1000).getSeconds()}
                        </p>
                      </div>
                    )
                  }
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;