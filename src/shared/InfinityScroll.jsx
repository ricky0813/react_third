import React from 'react';
import _ from 'lodash';
import { Spinner } from '../elements';

const InfinityScroll = (props) => {
    const {children, callNext, is_next, loading} = props;
        // 쓰로틀 :  마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는 것. 
        // 스크롤과 같이 같은 이벤트가 연이어 발생하는 곳에서 성능문제를 위해 사용한다.
    const _handleScroll = _.throttle(() => {
        // 로딩 중이라면 callNext를 실행하지 말아라.
        if(loading){
            return;
        }

        const {innerHeight} = window;
        const {scrollHeight} = document.body;
        // 호환성의 문제로 scrollTop값은 이렇게 가져온다. 크롬만 지원한다면 document.body.scrollTop만으로 가능.
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        // 스크롤이 200px 이하호 남은 경우 실행
        
        if(scrollHeight - scrollTop - innerHeight < 200){
            callNext();
        }
    },300);

    const handleScroll = React.useCallback(_handleScroll,[loading])

    React.useEffect(() => {
        // 역시나 로딩 중이라면 callNext를 실행하지 않도록.
        if(loading){
            return;
        }
        // 처음에 is_next가 있을 시에 이벤트 구독
        if(is_next){
            window.addEventListener('scroll', handleScroll);
        // is_next의 값이 바뀌어 다시 useEffect가 돌게 되면 이벤트 구독해제
        } else{
            window.removeEventListener('scroll', handleScroll);
        }
        //클린업 함수 - 이벤트 제거
        return () => window.removeEventListener('scroll', handleScroll);
    },[is_next, loading])
    
    return (
        <>
            {children}
            {is_next && <Spinner/>}
        </>
    );
};

InfinityScroll.defaultProps = {
    children: null,
    callNext: () => {},
    is_next: false,
    loading: false,
}

export default InfinityScroll;