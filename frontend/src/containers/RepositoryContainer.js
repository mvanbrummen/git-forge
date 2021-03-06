import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import { getRepositorySummary, getZipFileUrl } from '../util/RepositoryService';
import Breadcrumb from '../components/repository/Breadcrumb';
import RepositoryControls from '../components/repository/RepositoryControls';
import RepositoryTabs from '../components/repository/RepositoryTabs';
import Description from '../components/repository/Description';
import GettingStartedInstructions from '../components/repository/GettingStartedInstructions';
import ActivityBar from '../components/repository/ActivityBar';
import BranchDropdown from '../components/repository/BranchDropdown';
import CreateButton from '../components/repository/CreateButton';
import DownloadDropdown from '../components/repository/DownloadDropdown';
import DirectoryTable from '../components/repository/DirectoryTable';
import ReadmeTable from '../components/repository/ReadmeTable';
import DownloadButton from '../components/repository/DownloadButton';
import { Nav } from '../components/Nav';

class RepositoryContainer extends Component {

    state = {
        repoSummary: {
            description: '',
            totalCommits: null,
            lastCommit: [],
            branches: [],
            items: [],
            readme: null
        }
    }

    getRepositorySummary(account, repoName) {
        getRepositorySummary(account, repoName).then((summary) => {
            this.setState({ repoSummary: summary })
        });
    }

    componentDidMount() {
        this.getRepositorySummary(this.props.match.params.userName, this.props.match.params.repoName);
    }

    render() {
        const { repoSummary } = this.state;
        const currentUrl = this.props.match.url;

        const { userName, repoName } = this.props.match.params;
        const zipFileName = `${repoName}_master.zip`;
        const zipFileUrl = getZipFileUrl(userName, repoName, zipFileName);

        return (
            <div>
                <Nav />
                <div className="container">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">

                            <div className="columns">
                                <div className="column">
                                    <Breadcrumb userName={this.props.match.params.userName} repoName={this.props.match.params.repoName} />
                                </div>
                                <div className="column">
                                    <RepositoryControls />
                                </div>
                            </div>

                            <RepositoryTabs />

                            {repoSummary.description !== '' &&
                                <Description description={repoSummary.description} />
                            }

                            {repoSummary.isClean &&
                                <GettingStartedInstructions />
                            }

                            {!repoSummary.isClean &&

                                <div>
                                    <ActivityBar url={currentUrl} repoSummary={repoSummary} />

                                    <nav className="level">
                                        <div className="level-left">
                                            <BranchDropdown branches={repoSummary.branches}
                                                tags={repoSummary.tags}
                                                currentBranch={'master'} />
                                            <CreateButton url={currentUrl} />
                                        </div>

                                        <div className="level-right">
                                            <DownloadButton
                                                zipFileUrl={zipFileUrl}
                                                zipFileName={zipFileName}
                                            />
                                            <DownloadDropdown />
                                        </div>
                                    </nav>

                                    <DirectoryTable
                                        items={repoSummary.items}
                                        lastCommit={repoSummary.lastCommit}
                                        url={this.props.match.url}
                                        isRoot={true} />

                                    {
                                        (repoSummary.readme !== null && repoSummary.readme !== undefined) &&
                                        <ReadmeTable readme={repoSummary.readme} />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RepositoryContainer;