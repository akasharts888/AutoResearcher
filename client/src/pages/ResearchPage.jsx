import React, { useState ,useEffect} from 'react';
import TopicInput from '../components/TopicInput';
import ObjectivesPanel from '../components/ObjectivesPanel';
import ResearchSummary from '../components/ResearchSummary';
import SourceList from '../components/SourceList';
import SaveToMemory from '../components/SaveToMemory'
import HistorySidebar from '../components/HistorySidebar';

const ResearchPage = () => {
    const [topic, setTopic] = useState('');
    const [objectives, setObjectives] = useState([]);
    const [summary, setSummary] = useState('');
    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(false);
    const [triggered, setTriggered] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
      const Histories = async() => {
        try {
          const res = await fetch('http://localhost:5000/api/research-sessions',{
            credentials:"include"
          });
          const sessions = await res.json();
          // console.log("sessions are ::",sessions.sessions);
          setHistory(sessions.sessions);
        } catch(err){
          console.error("Error fetching chat sessions:", err);
        }
      };
      Histories();
    },[]);

    const session = async() => {
      try{
        const res = await fetch(`http://localhost:5000/api/research-session/${topic}`,{
          credentials:"include"
        });
        const data = await res.json();

        // console.log("detail is ::",data);
        
        setObjectives(data.session[0].objectives);
        setSummary(data.session[0].summary);
        setSources(data.session[0].sources);
        setTriggered(true);
      } catch(err){
        console.error("Error fetching chat sessions:", err);
      }
    }

    const handleSearch = async () => {
      console.log("topic name is ::",topic);
      if (!topic.trim()) return;

      setLoading(true);
      setTriggered(false);

      try{
        const response = await fetch('http://localhost:5000/api/research',{
          method:"POST",
          credentials:"include",
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({ topic }),
        });

        const data = await response.json();
        setObjectives(data.Objectives || []);
        setSummary(data.summary || '');
        setSources(data.sources || []);
        setTriggered(true);
        if (!history.includes(topic)) {
          setHistory(prev => [topic, ...prev]);
        }
        
      }catch (error) {
        console.error("Failed to fetch research:",error);
        alert("something went wrong. Please try again!");
        setTriggered(true);
      } finally{
        setLoading(false);
      }
    };
    // console.log("objective ::",objectives);
    return (
        <div className="bg-[#f9f5f0] min-h-screen py-8 px-4">
            <div className="max-w-7xl mx-auto flex gap-8">
                {/* Sidebar */}
                <HistorySidebar history={history} onSelectTopic={(t) => {
                  setTopic(t.query);
                  session();
                }} />

                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-6 text-[#4b3f35] text-center">Start Your Research</h1>
                  <TopicInput topic={topic} setTopic={setTopic} handleSearch={handleSearch} />

                  {loading && (
                    <p className="text-center text-[#5f5244] font-medium my-6 animate-pulse">
                      Running intelligent research analysis..
                    </p>
                  )}

                  {triggered && !loading && (
                    <>
                      <ObjectivesPanel objectives={objectives} />
                      <ResearchSummary summary={summary} />
                      <SourceList sources={sources} />
                      <SaveToMemory topic={topic} />
                    </>
                  )}
                </div>
            </div>
        </div>
    );
};

export default ResearchPage;